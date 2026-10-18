import Image from "next/image";
import logoSrc from "@/public/gems-future-logo.png";

// Preserve the image's real aspect ratio from the static import, so the logo
// never distorts even if the source art's proportions change later.
const ASPECT = logoSrc.width / logoSrc.height;

/**
 * Gems Future logo (brand mark + wordmark baked into the image).
 * Width is derived from the requested height and the image's aspect ratio.
 */
export function Logo({
  className,
  height = 52,
}: {
  className?: string;
  /** Rendered height in px; width follows the image aspect ratio. */
  height?: number;
}) {
  return (
    <Image
      src={logoSrc}
      alt="Gems Future"
      height={height}
      width={Math.round(height * ASPECT)}
      priority
      className={className}
    />
  );
}
