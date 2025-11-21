/**
 * Custom image loader for Webflow Cloud compatibility
 *
 * This loader is referenced in next.config.ts to satisfy Webflow Cloud's
 * injected template requirements. Since we use unoptimized images, this
 * loader simply returns the source URL unchanged.
 */

export default function webflowLoader({ src }: { src: string }) {
  return src;
}
