// Shared behaviour for the short silent clips that sit over a still image:
// the Family Long-Table card (Experiences.astro) and the private-hire hero
// (ClassLanding.astro).
//
// The still underneath is a real <Image>, not a poster="" attribute, so it is
// what crawlers, JSON-LD and reduced-motion visitors get, and it stays the LCP
// candidate. The clip is layered on top and only fades in once it is genuinely
// playing, so a blocked or slow load leaves the photo rather than a black box.
//
// Markup contract:
//   <img ...>                                  the still, always rendered
//   <video data-loop-video data-src="…" muted loop playsinline preload="none">
// plus a `.is-playing { opacity: 1 }` rule on the video.
export function setupLoopVideos() {
  const vids = document.querySelectorAll<HTMLVideoElement>('[data-loop-video]');
  if (!vids.length) return;
  // Bail before the file is ever requested, not just before it animates.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ((navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData) return;
  if (!('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        const v = en.target as HTMLVideoElement;
        if (!en.isIntersecting) {
          v.pause();
          return;
        }
        if (!v.src && v.dataset.src) {
          v.addEventListener('playing', () => v.classList.add('is-playing'), { once: true });
          v.src = v.dataset.src;
        }
        // Autoplay can still be refused (iOS Low Power Mode); the still stays.
        v.play().catch(() => {});
      });
    },
    { threshold: 0.25 }
  );
  vids.forEach((v) => io.observe(v));
}
