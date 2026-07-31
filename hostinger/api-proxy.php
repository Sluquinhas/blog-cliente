<?php
// Blog Padilha - PHP reverse proxy para Next.js standalone (porta 3003)
// Redireciona TODAS as requisicoes pro processo Node interno

$target = 'http://127.0.0.1:3003' . $_SERVER['REQUEST_URI'];

$ch = curl_init($target);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);

// -------- Body / uploads --------
// PHP consome automaticamente o body quando Content-Type é multipart/form-data
// ou application/x-www-form-urlencoded — colocando os campos em $_POST e $_FILES
// e esvaziando php://input. Precisamos reconstruir o body pra reenviar ao Node.
$contentType = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
$isMultipart = stripos($contentType, 'multipart/form-data') !== false;
$isFormUrlencoded = stripos($contentType, 'application/x-www-form-urlencoded') !== false;
$rawBody = file_get_contents('php://input');

$overrideContentType = null;

if ($isMultipart) {
    // Reconstruimos o multipart do zero com um novo boundary.
    // Necessario porque PHP ja consumiu o body original em $_POST + $_FILES.
    // Server Actions do Next 16 sempre chegam como multipart mesmo sem file.
    $boundary = '----BlogPadilhaProxy' . bin2hex(random_bytes(12));
    $body = '';
    foreach ($_POST as $name => $value) {
        // Suporte a arrays (campo[]=a&campo[]=b) achatando em multiplas partes
        if (is_array($value)) {
            foreach ($value as $v) {
                $body .= "--$boundary\r\n";
                $body .= "Content-Disposition: form-data; name=\"" . $name . "[]\"\r\n\r\n";
                $body .= $v . "\r\n";
            }
        } else {
            $body .= "--$boundary\r\n";
            $body .= "Content-Disposition: form-data; name=\"$name\"\r\n\r\n";
            $body .= $value . "\r\n";
        }
    }
    foreach ($_FILES as $name => $file) {
        if ($file['error'] === UPLOAD_ERR_OK) {
            $body .= "--$boundary\r\n";
            $body .= "Content-Disposition: form-data; name=\"$name\"; filename=\"" . $file['name'] . "\"\r\n";
            $body .= "Content-Type: " . $file['type'] . "\r\n\r\n";
            $body .= file_get_contents($file['tmp_name']) . "\r\n";
        }
    }
    $body .= "--$boundary--\r\n";
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    $overrideContentType = "multipart/form-data; boundary=$boundary";
} elseif ($isFormUrlencoded) {
    // Reconstroi a partir de $_POST (PHP tambem consumiu esse)
    $body = http_build_query($_POST);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
} else {
    // JSON, text/plain, etc - php://input funciona normal
    $body = $rawBody;
    if ($body) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    }
}

// -------- Headers --------
// Descobre o host publico + protocolo pra sinalizar corretamente pro Next:
// sem esses X-Forwarded-*, o Next enxerga Host=127.0.0.1:3003 e Origin do
// browser=raimundopadilha.com.br, bloqueando toda Server Action por CSRF
// com "Invalid Server Actions request".
$publicHost = isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] !== ''
    ? $_SERVER['HTTP_HOST']
    : (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'raimundopadilha.com.br');
$publicProto = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (isset($_SERVER['SERVER_PORT']) && (int)$_SERVER['SERVER_PORT'] === 443)
    || (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
    ? 'https' : 'http';
$clientIp = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';

$headers = array();
$hasAuth = false;
foreach (getallheaders() as $name => $value) {
    $lower = strtolower($name);
    // Nunca repassar Host (curl gera 127.0.0.1:3003) nem Content-Length (vamos recalcular).
    if ($lower === 'host' || $lower === 'content-length') continue;
    // X-Forwarded-*: substituimos por valores explicitos com o dominio publico.
    if ($lower === 'x-forwarded-host' || $lower === 'x-forwarded-proto' || $lower === 'x-forwarded-for') continue;
    // Content-Type: substitui pelo boundary novo quando reconstruimos multipart.
    if ($overrideContentType !== null && $lower === 'content-type') continue;
    if ($lower === 'authorization') $hasAuth = true;
    $headers[] = "$name: $value";
}
$headers[] = "X-Forwarded-Host: $publicHost";
$headers[] = "X-Forwarded-Proto: $publicProto";
if ($clientIp !== '') {
    $headers[] = "X-Forwarded-For: $clientIp";
}
if ($overrideContentType !== null) {
    $headers[] = "Content-Type: $overrideContentType";
}
if (!$hasAuth) {
    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers[] = "Authorization: " . $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $headers[] = "Authorization: " . $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    }
}
if (isset($body) && $body !== '' && $body !== null) {
    $headers[] = "Content-Length: " . strlen($body);
}
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);

if (curl_errno($ch)) {
    http_response_code(502);
    header('Content-Type: text/html; charset=utf-8');
    echo '<h1>502 - Backend indisponivel</h1><p>O servidor Node esta inicializando. Tente novamente em alguns segundos.</p>';
    echo '<!-- ' . htmlspecialchars(curl_error($ch)) . ' -->';
    exit;
}

$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
curl_close($ch);

$responseHeaders = substr($response, 0, $headerSize);
$responseBody = substr($response, $headerSize);

// Repassar headers (exceto os problematicos)
foreach (explode("\r\n", $responseHeaders) as $header) {
    if (empty($header)) continue;
    if (strpos($header, 'HTTP/') === 0) continue;
    if (stripos($header, 'Transfer-Encoding') === 0) continue;
    if (stripos($header, 'Content-Length') === 0) continue;
    header($header);
}

http_response_code($httpCode);
echo $responseBody;
