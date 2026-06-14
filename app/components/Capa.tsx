import Image from "next/image";

type Props = {
  src?: string | null;
  alt: string;
  /** Classes do wrapper — defina aqui a altura/aspect-ratio (ex.: "h-40", "aspect-[16/9]"). */
  className?: string;
  sizes?: string;
  priority?: boolean;
};

// Capa do artigo via next/image (fill). Usa uma capa padrão sóbria quando não
// há imagem definida. O wrapper precisa ter altura/aspect-ratio definidos.
export default function Capa({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px",
  priority = false,
}: Props) {
  const url = src && src.trim() ? src : "/capas/default.svg";

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${
        className ?? ""
      }`}
    >
      <Image
        src={url}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
