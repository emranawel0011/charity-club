import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollEntranceOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  childSelector?: string;
}

export function useScrollEntrance<T extends HTMLElement>(
  options: ScrollEntranceOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      y = 40,
      duration = 0.6,
      delay = 0,
      stagger = 0.1,
      start = 'top 85%',
      childSelector,
    } = options;

    const targets = childSelector
      ? element.querySelectorAll(childSelector)
      : element;

    gsap.set(targets, { opacity: 0, y });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger: childSelector ? stagger : 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return ref;
}
