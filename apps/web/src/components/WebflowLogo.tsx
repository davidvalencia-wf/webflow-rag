/**
 * Webflow Logo Component
 *
 * Official Webflow brand logo from brand.webflow.com
 * The mark is a W made up of three shapes representing HTML, CSS, and JavaScript
 *
 * Usage:
 * - Use Blue version (#146EF5) whenever possible
 * - Use White version on dark backgrounds
 * - Maintain proper clearspace (equal to logo height)
 *
 * Note: With basePath: '/app' and unoptimized images, Next.js Image component
 * doesn't automatically prefix asset paths. We use assetPath() helper to ensure
 * correct paths in both dev and production.
 *
 * @see https://brand.webflow.com/brand-assets
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath
 */

import Image from 'next/image';
import { assetPath } from '@/lib/basePath';

interface WebflowLogoProps {
  variant?: 'blue-white' | 'white';
  size?: number; // Width in pixels
  className?: string;
}

/**
 * Full Webflow wordmark logo
 * Aspect ratio: ~5.4:1 (width:height)
 */
export function WebflowLogo({
  variant = 'white',
  size = 120,
  className = ''
}: WebflowLogoProps) {
  const logoPath = variant === 'white'
    ? '/Full_Logo_White.svg'
    : '/Full_Logo_Blue_White.svg';

  // Webflow logo has aspect ratio of approximately 5.4:1
  const height = Math.round(size / 5.4);

  return (
    <Image
      src={assetPath(logoPath)}
      alt="Webflow"
      width={size}
      height={height}
      className={className}
      priority
    />
  );
}

interface WebflowMarkProps {
  variant?: 'blue' | 'white';
  size?: number; // Width/height in pixels (square)
  className?: string;
}

/**
 * Webflow W mark (square icon)
 * Use for favicons, small branding, social icons
 */
export function WebflowMark({
  variant = 'blue',
  size = 40,
  className = ''
}: WebflowMarkProps) {
  const markPath = variant === 'blue'
    ? '/Mark_Logo_Blue.svg'
    : '/Mark_Logo_White.svg';

  return (
    <Image
      src={assetPath(markPath)}
      alt="Webflow"
      width={size}
      height={size}
      className={className}
    />
  );
}
