import { useEffect, useRef, useState } from 'react';

export function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    const queryReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const attrReduced = document.documentElement.getAttribute('data-motion') === 'reducidas';
    return queryReduced || attrReduced;
  });

  useEffect(() => {
    if (isVisible) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, isVisible]);

  return [ref, isVisible];
}
