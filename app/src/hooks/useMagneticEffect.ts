import { useEffect, useRef, useCallback } from 'react';

export function useMagneticEffect() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rafId = useRef<number>(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const isHovering = useRef(false);

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const animate = useCallback(() => {
    currentX.current = lerp(currentX.current, targetX.current, 0.15);
    currentY.current = lerp(currentY.current, targetY.current, 0.15);

    if (buttonRef.current) {
      buttonRef.current.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Don't apply on touch devices
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const maxDistance = 60;
      const maxOffset = 8;

      if (distance < maxDistance) {
        isHovering.current = true;
        const strength = 1 - distance / maxDistance;
        targetX.current = distanceX * strength * (maxOffset / maxDistance);
        targetY.current = distanceY * strength * (maxOffset / maxDistance);
      } else {
        isHovering.current = false;
        targetX.current = 0;
        targetY.current = 0;
      }
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      targetX.current = 0;
      targetY.current = 0;
    };

    rafId.current = requestAnimationFrame(animate);

    document.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animate]);

  return buttonRef;
}
