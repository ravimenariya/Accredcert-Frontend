const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
let revealObserver: IntersectionObserver | null = null;
let groupObserver: IntersectionObserver | null = null;
let parallaxRaf: number | null = null;
let parallaxHandler: (() => void) | null = null;
let progressHandler: (() => void) | null = null;

function setInitialStates() {
  document.querySelectorAll<HTMLElement>("[data-animate='reveal']").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(36px)";
    el.style.filter = "blur(8px)";
    el.style.willChange = "opacity, transform, filter";
  });

  document.querySelectorAll<HTMLElement>("[data-animate-item='stagger']").forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(24px)";
    item.style.willChange = "opacity, transform";
  });
}

function bindReveals() {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.style.transition = "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), filter 0.9s cubic-bezier(0.22, 1, 0.36, 1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.style.filter = "blur(0px)";
        revealObserver?.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll<HTMLElement>("[data-animate='reveal']").forEach((el) => {
    revealObserver?.observe(el);
  });
}

function bindStaggers() {
  groupObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const group = entry.target as HTMLElement;
        const items = Array.from(group.querySelectorAll<HTMLElement>("[data-animate-item='stagger']"));
        items.forEach((item, index) => {
          item.style.transition = `opacity 0.72s cubic-bezier(0.22, 1, 0.36, 1) ${index * 120}ms, transform 0.72s cubic-bezier(0.22, 1, 0.36, 1) ${index * 120}ms`;
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        });
        groupObserver?.unobserve(group);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  document.querySelectorAll<HTMLElement>("[data-animate-group='stagger']").forEach((group) => {
    groupObserver?.observe(group);
  });
}

function bindParallax() {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-animate='parallax']"));
  if (!els.length) return;

  parallaxHandler = () => {
    if (parallaxRaf !== null) return;
    parallaxRaf = window.requestAnimationFrame(() => {
      const viewport = window.innerHeight;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2) / viewport;
        const shift = (progress - 0.5) * 28;
        const scale = 1.03 + (0.5 - Math.abs(progress - 0.5)) * 0.04;
        el.style.transform = `translate3d(0, ${shift}px, 0) scale(${Math.max(1, scale)})`;
        el.style.willChange = "transform";
      });
      parallaxRaf = null;
    });
  };

  window.addEventListener("scroll", parallaxHandler, { passive: true });
  parallaxHandler();
}

function bindProgress() {
  const progress = document.querySelector<HTMLElement>("[data-scroll-progress]");
  if (!progress) return;

  progressHandler = () => {
    const doc = document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;
    const value = total > 0 ? window.scrollY / total : 0;
    progress.style.transformOrigin = "left center";
    progress.style.transform = `scaleX(${Math.max(0, Math.min(1, value))})`;
  };

  window.addEventListener("scroll", progressHandler, { passive: true });
  progressHandler();
}

export function runScrollAnimations() {
  if (typeof window === "undefined") return;
  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

  cleanupScrollAnimations();
  setInitialStates();
  bindReveals();
  bindStaggers();
  bindParallax();
  bindProgress();
}

export function cleanupScrollAnimations() {
  revealObserver?.disconnect();
  groupObserver?.disconnect();
  revealObserver = null;
  groupObserver = null;

  if (parallaxHandler) {
    window.removeEventListener("scroll", parallaxHandler);
    parallaxHandler = null;
  }

  if (progressHandler) {
    window.removeEventListener("scroll", progressHandler);
    progressHandler = null;
  }

  if (parallaxRaf !== null) {
    window.cancelAnimationFrame(parallaxRaf);
    parallaxRaf = null;
  }
}
