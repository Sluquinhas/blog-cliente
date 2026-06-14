// Seed do banco em Node puro (better-sqlite3), sem depender de runner TypeScript.
// Idempotente: usa ON CONFLICT(slug) DO NOTHING, então pode ser executado de
// novo sem duplicar nem apagar conteúdo criado pelo painel.
//
// Uso: node prisma/seed.mjs   (ou: npm run seed)
import "dotenv/config";
import Database from "better-sqlite3";
import path from "node:path";

const raw = process.env.DATABASE_URL || "file:./dev.db";
const filePart = raw.replace(/^file:/, "");
const dbPath = path.isAbsolute(filePart)
  ? filePart
  : path.resolve(process.cwd(), filePart);

const db = new Database(dbPath);

// Garante a tabela mesmo se o seed rodar antes do migrate (mesma definição da migration).
db.exec(`
CREATE TABLE IF NOT EXISTS "Artigo" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "titulo" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "categoria" TEXT NOT NULL,
  "resumo" TEXT NOT NULL,
  "conteudo" TEXT NOT NULL,
  "autor" TEXT NOT NULL,
  "data" TEXT NOT NULL,
  "tempoLeitura" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Rascunho',
  "imagemCapa" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "Artigo_slug_key" ON "Artigo"("slug");
`);

// Prisma armazena DateTime no SQLite como texto ISO-8601 com offset (+00:00).
function iso(s) {
  return new Date(s).toISOString().replace("Z", "+00:00");
}

const AUTOR = "Raimundo Padilha";

const artigos = [
  {
    titulo: "Entendendo a taxa Selic e seu impacto nos investimentos",
    slug: "taxa-selic-impacto-nos-investimentos",
    categoria: "Economia",
    resumo:
      "A Selic é a taxa básica de juros da economia e influencia desde o crédito até o rendimento das suas aplicações. Veja como ela funciona na prática.",
    conteudo:
      "A taxa Selic é a taxa básica de juros da economia brasileira, definida pelo Comitê de Política Monetária (Copom) do Banco Central a cada 45 dias. Ela serve de referência para praticamente todas as outras taxas do país, do rendimento da poupança ao custo do financiamento de um imóvel.\n\nQuando a inflação está alta, o Banco Central tende a elevar a Selic. Juros mais altos encarecem o crédito, desestimulam o consumo e ajudam a conter a alta de preços. Quando a economia precisa de estímulo, o movimento costuma ser o oposto: a queda dos juros barateia o crédito e incentiva o consumo e o investimento produtivo.\n\nPara o investidor, a Selic é decisiva. Em ciclos de juros altos, a renda fixa pós-fixada (como o Tesouro Selic e CDBs atrelados ao CDI) tende a entregar bons retornos com baixo risco. Já em ciclos de queda, parte dos recursos costuma migrar para a renda variável e para títulos prefixados, em busca de retornos maiores.\n\nMais importante do que tentar adivinhar o próximo passo do Copom é entender que a Selic se move em ciclos. Construir uma carteira que funcione tanto em juros altos quanto baixos — com prazos e indexadores diferentes — é o que protege o patrimônio ao longo do tempo.",
    data: "2 de junho de 2026",
    tempoLeitura: "6 min de leitura",
    status: "Publicado",
    imagemCapa: "/capas/selic.svg",
    createdAt: iso("2026-06-02T13:00:00Z"),
  },
  {
    titulo: "Renda variável: oportunidades e riscos da bolsa de valores",
    slug: "renda-variavel-oportunidades-e-riscos",
    categoria: "Mercado Financeiro",
    resumo:
      "Investir em ações pode acelerar a construção de patrimônio, mas exige método e tolerância à volatilidade. Entenda o essencial antes de começar.",
    conteudo:
      "A renda variável reúne os investimentos cujo retorno não é conhecido no momento da aplicação — ações, fundos imobiliários, ETFs e BDRs são alguns exemplos. O nome diz tudo: os preços oscilam, às vezes de forma intensa, conforme as expectativas do mercado mudam.\n\nO atrativo da bolsa é o potencial de retorno no longo prazo. Ao comprar uma ação, você se torna sócio de uma empresa e participa dos seus lucros, seja pela valorização dos papéis, seja pela distribuição de dividendos. Historicamente, boas empresas tendem a crescer e a remunerar seus acionistas ao longo dos anos.\n\nO outro lado é o risco. No curto prazo, a volatilidade é a regra, não a exceção. Por isso, a renda variável faz mais sentido para objetivos de longo prazo e para a parcela do patrimônio que você não precisará resgatar tão cedo. Investir o dinheiro da reserva de emergência em ações é um erro clássico.\n\nDois princípios reduzem muito o risco: diversificar entre vários ativos e setores, e investir com regularidade, independentemente do humor do mercado. Tentar acertar o melhor momento de entrada e saída costuma custar caro. Disciplina e horizonte de longo prazo são os maiores aliados do investidor em renda variável.",
    data: "26 de maio de 2026",
    tempoLeitura: "7 min de leitura",
    status: "Publicado",
    imagemCapa: "/capas/bolsa.svg",
    createdAt: iso("2026-05-26T13:00:00Z"),
  },
  {
    titulo: "Renda fixa: o ponto de partida para investir com segurança",
    slug: "renda-fixa-investir-com-seguranca",
    categoria: "Investimentos",
    resumo:
      "Tesouro Direto, CDBs, LCIs e LCAs são a base de qualquer carteira equilibrada. Conheça os principais títulos e como escolher entre eles.",
    conteudo:
      "Na renda fixa, as regras de remuneração são conhecidas no momento da aplicação. Você empresta dinheiro a um emissor — o governo, um banco ou uma empresa — e recebe de volta o valor acrescido de juros. É a base sobre a qual a maioria das carteiras bem construídas é montada.\n\nOs títulos costumam ser classificados por indexador. Os pós-fixados acompanham uma taxa de referência, normalmente o CDI ou a Selic, e são ideais para a reserva de emergência e para momentos de juros altos. Os prefixados travam uma taxa fixa, o que pode ser vantajoso quando se espera queda dos juros. Já os títulos atrelados à inflação (como o Tesouro IPCA+) garantem um ganho real acima da inflação, protegendo o poder de compra no longo prazo.\n\nA segurança varia conforme o emissor. Títulos públicos do Tesouro Direto são considerados os de menor risco do país. Já CDBs, LCIs e LCAs contam com a proteção do Fundo Garantidor de Créditos (FGC) até o limite vigente por instituição, o que reduz bastante o risco de calote.\n\nAntes de aplicar, observe três pontos: o prazo (e a liquidez de que você precisa), o indexador (que define como o título se comporta em diferentes cenários) e a tributação. Combinar títulos com vencimentos e indexadores diferentes é uma forma simples e eficaz de equilibrar segurança e rentabilidade.",
    data: "19 de maio de 2026",
    tempoLeitura: "6 min de leitura",
    status: "Publicado",
    imagemCapa: "/capas/renda-fixa.svg",
    createdAt: iso("2026-05-19T13:00:00Z"),
  },
  {
    titulo: "Diversificação: por que não colocar todos os ovos na mesma cesta",
    slug: "diversificacao-da-carteira-de-investimentos",
    categoria: "Investimentos",
    resumo:
      "Distribuir os recursos entre diferentes classes de ativos reduz riscos sem necessariamente abrir mão de retorno. Entenda como diversificar bem.",
    conteudo:
      "Diversificar é distribuir os investimentos entre ativos com comportamentos diferentes, de modo que o desempenho ruim de um seja compensado pelo bom desempenho de outro. É um dos poucos almoços grátis das finanças: bem feita, a diversificação reduz o risco da carteira sem exigir, na mesma proporção, abrir mão de retorno.\n\nA primeira camada é diversificar entre classes de ativos: renda fixa, ações, fundos imobiliários e, eventualmente, exposição ao exterior. Cada classe reage de forma distinta aos ciclos econômicos. Quando os juros sobem, a renda fixa pós-fixada brilha; quando a economia aquece, a renda variável tende a se beneficiar.\n\nA segunda camada é diversificar dentro de cada classe. Em ações, isso significa não concentrar tudo em uma única empresa ou setor. Em renda fixa, significa variar emissores, prazos e indexadores. O objetivo é evitar que um único evento — uma crise setorial, o calote de um emissor — comprometa boa parte do patrimônio.\n\nDiversificação não é o mesmo que pulverização. Espalhar recursos por dezenas de produtos parecidos não reduz risco e ainda dificulta o acompanhamento. O ponto de equilíbrio é uma carteira coerente com os seus objetivos e o seu perfil de risco, revisada periodicamente para manter as proporções planejadas.",
    data: "12 de maio de 2026",
    tempoLeitura: "5 min de leitura",
    status: "Publicado",
    imagemCapa: "/capas/diversificacao.svg",
    createdAt: iso("2026-05-12T13:00:00Z"),
  },
  {
    titulo: "Inflação: como ela corrói o seu poder de compra",
    slug: "inflacao-e-poder-de-compra",
    categoria: "Economia",
    resumo:
      "Entender a inflação é fundamental para proteger o patrimônio. Veja o que ela representa e como investir para não perder poder de compra.",
    conteudo:
      "Inflação é o aumento generalizado e contínuo dos preços ao longo do tempo. Quando ela sobe, o mesmo dinheiro passa a comprar menos: o poder de compra diminui. No Brasil, o índice oficial é o IPCA, calculado pelo IBGE, que serve de referência para as metas do Banco Central.\n\nUma inflação moderada é considerada normal em uma economia saudável. O problema aparece quando ela acelera e fica imprevisível, corroendo salários, encarecendo o crédito e dificultando o planejamento de famílias e empresas. É para conter esses excessos que o Banco Central usa a taxa de juros como principal instrumento.\n\nPara o investidor, a inflação é um adversário silencioso. Deixar dinheiro parado na conta ou em aplicações que rendem menos do que a inflação significa perder poder de compra mesmo que o saldo nominal aumente. O retorno que realmente importa é o retorno real — aquele que supera a inflação.\n\nA boa notícia é que existem instrumentos específicos para se proteger. Títulos atrelados ao IPCA, como o Tesouro IPCA+, garantem um ganho acima da inflação. Ações de empresas sólidas e fundos imobiliários também tendem a repassar a alta de preços ao longo do tempo. O essencial é não deixar o patrimônio exposto, sem proteção, à corrosão inflacionária.",
    data: "5 de maio de 2026",
    tempoLeitura: "5 min de leitura",
    status: "Publicado",
    imagemCapa: "/capas/inflacao.svg",
    createdAt: iso("2026-05-05T13:00:00Z"),
  },
  {
    titulo: "Reserva de emergência: o alicerce das finanças pessoais",
    slug: "reserva-de-emergencia-financas-pessoais",
    categoria: "Finanças Pessoais",
    resumo:
      "Antes de pensar em rentabilidade, é preciso ter segurança. A reserva de emergência é o primeiro passo de qualquer estratégia financeira sólida.",
    conteudo:
      "A reserva de emergência é o dinheiro guardado para imprevistos — uma despesa médica, a perda de uma fonte de renda, um reparo urgente. É o que permite atravessar momentos difíceis sem recorrer a dívidas caras ou precisar vender investimentos no pior momento possível.\n\nA recomendação mais comum é acumular de três a seis meses do seu custo de vida. Quem tem renda mais instável, como autônomos e empreendedores, costuma se beneficiar de uma reserva maior, capaz de cobrir até doze meses de despesas.\n\nO objetivo da reserva não é render muito, e sim estar disponível quando você precisar. Por isso, ela deve ficar em aplicações de altíssima liquidez e baixo risco, que possam ser resgatadas a qualquer momento sem perdas — o Tesouro Selic e CDBs de liquidez diária com proteção do FGC são as opções mais usadas.\n\nMontar a reserva antes de buscar investimentos mais arrojados é o que diferencia uma estratégia sólida de uma aposta. Com a base de segurança garantida, você investe o restante com tranquilidade, sem ser forçado a desfazer posições de longo prazo diante do primeiro imprevisto.",
    data: "28 de abril de 2026",
    tempoLeitura: "5 min de leitura",
    status: "Publicado",
    imagemCapa: "/capas/reserva.svg",
    createdAt: iso("2026-04-28T13:00:00Z"),
  },
];

const insert = db.prepare(`
  INSERT INTO "Artigo"
    (titulo, slug, categoria, resumo, conteudo, autor, data, tempoLeitura, status, imagemCapa, createdAt, updatedAt)
  VALUES
    (@titulo, @slug, @categoria, @resumo, @conteudo, @autor, @data, @tempoLeitura, @status, @imagemCapa, @createdAt, @updatedAt)
  ON CONFLICT(slug) DO NOTHING
`);

const tx = db.transaction((rows) => {
  let n = 0;
  for (const r of rows) {
    const info = insert.run({
      ...r,
      autor: AUTOR,
      updatedAt: r.createdAt,
    });
    n += info.changes;
  }
  return n;
});

const inseridos = tx(artigos);
console.log(
  `Seed concluído: ${inseridos} novo(s) artigo(s) inserido(s) de ${artigos.length}. Banco: ${dbPath}`
);

db.close();
