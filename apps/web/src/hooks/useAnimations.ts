/**
 * useAnimations Hook
 * GSAP animation setup and lifecycle management
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/animations';

/**
 * Hook to run GSAP animation on mount
 */
export function useGSAP(animationFn: () => void, deps: React.DependencyList = []) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    animationFn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Hook for entrance animation on component mount
 */
export function useEntranceAnimation(selector: string, options: gsap.TweenVars = {}) {
  useGSAP(() => {
    gsap.from(selector, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out',
      ...options,
    });
  }, [selector]);
}

/**
 * Hook for stagger animation on list items
 */
export function useStaggerAnimation(selector: string, staggerDelay = 0.1) {
  useGSAP(() => {
    gsap.from(selector, {
      opacity: 0,
      y: 20,
      stagger: staggerDelay,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [selector, staggerDelay]);
}

/**
 * Hook for hover animations
 */
export function useHoverAnimation(
  ref: React.RefObject<HTMLElement>,
  hoverVars: gsap.TweenVars,
  defaultVars: gsap.TweenVars
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const handleMouseEnter = () => {
      gsap.to(element, { ...hoverVars, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(element, { ...defaultVars, duration: 0.3, ease: 'power2.in' });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, hoverVars, defaultVars]);
}

/**
 * Hook for counter animation (odometer effect)
 */
export function useCounterAnimation(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  duration = 1.5
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) {
      if (element) element.textContent = target.toLocaleString();
      return;
    }

    const obj = { value: 0 };

    gsap.to(obj, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.floor(obj.value).toLocaleString();
      },
    });
  }, [ref, target, duration]);
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollAnimation(
  selector: string,
  options: gsap.TweenVars & { trigger?: string } = {}
) {
  useGSAP(() => {
    if (typeof window === 'undefined') return;

    const { trigger = selector, ...animationVars } = options;

    gsap.from(selector, {
      scrollTrigger: {
        trigger,
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out',
      ...animationVars,
    });
  }, [selector]);
}

/**
 * Hook for magnetic button effect
 */
export function useMagneticEffect(ref: React.RefObject<HTMLElement | null>, strength = 0.3) {
  useEffect(() => {
    const button = ref.current;
    if (!button || prefersReducedMotion()) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(button, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);
}

/**
 * Hook for floating animation (breathing effect)
 */
export function useFloatingAnimation(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    gsap.to(element, {
      y: -10,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    gsap.to(element, {
      scale: 1.02,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, [ref]);
}
