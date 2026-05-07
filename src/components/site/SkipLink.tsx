/**
 * Skip-to-content link.
 *
 * Visually hidden until focused via keyboard (Tab from page load).
 * Required by WCAG 2.4.1 (Bypass Blocks).
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-(--brand-navy) focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-(--brand-cyan)"
    >
      Skip to content
    </a>
  );
}
