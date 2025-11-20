/**
 * GSAP Animation Library
 * Reusable animation timelines and presets for the Webflow RAG application
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero entrance animation
 * Animates logo, heading, search box, and filters in sequence
 */
export function createHeroEntranceAnimation() {
  const tl = gsap.timeline();

  tl.from('.hero-logo', {
    opacity: 0,
    y: -50,
    duration: 0.8,
    ease: 'power3.out',
  })
    .from('.hero-heading', {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }, '-=0.4')
    .from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.5,
    }, '-=0.3')
    .from('.hero-search', {
      opacity: 0,
      y: 30,
      duration: 0.5,
    }, '-=0.2')
    .from('.hero-filters', {
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 0.4,
    }, '-=0.2')
    .from('.hero-examples', {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.4,
    }, '-=0.2')
    .from('.hero-stats', {
      opacity: 0,
      y: 30,
      duration: 0.5,
    }, '-=0.1');

  return tl;
}

/**
 * Conversation turn reveal animation
 * Stagger animation for Q&A pairs
 */
export function animateConversationTurn(element: HTMLElement, index: number) {
  gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    delay: index * 0.15,
    ease: 'power2.out',
  });
}

/**
 * Related questions cascade animation
 * Elastic bounce reveal with stagger
 */
export function animateRelatedQuestions(container: HTMLElement) {
  const questions = container.querySelectorAll('.related-question');

  gsap.from(questions, {
    opacity: 0,
    x: -30,
    stagger: 0.12,
    duration: 0.6,
    ease: 'elastic.out(1, 0.5)',
  });
}

/**
 * Confidence badge pulse animation
 * Subtle glow effect based on confidence level
 */
export function animateConfidenceBadge(element: HTMLElement, confidence: number) {
  // High confidence gets green glow, medium gets amber, limited gets red
  const color = confidence >= 0.8 ? '#10B981' : confidence >= 0.5 ? '#F59E0B' : '#EF4444';

  gsap.to(element, {
    boxShadow: `0 0 20px ${color}40`,
    duration: 1,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: 2,
  });
}

/**
 * Counter animation (odometer effect)
 * Animates number from 0 to target value
 */
export function animateCounter(element: HTMLElement, target: number, duration = 1.5) {
  const obj = { value: 0 };

  gsap.to(obj, {
    value: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.floor(obj.value).toLocaleString();
    },
  });
}

/**
 * Magnetic button effect
 * Button follows cursor on hover
 */
export function createMagneticEffect(button: HTMLElement, strength = 0.3) {
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
}

/**
 * Citation card flip reveal
 * 3D card flip animation
 */
export function animateCitationCard(card: HTMLElement, index: number) {
  gsap.from(card, {
    opacity: 0,
    rotateY: -90,
    transformPerspective: 1000,
    transformOrigin: 'left center',
    duration: 0.6,
    delay: index * 0.1,
    ease: 'back.out(1.5)',
  });
}

/**
 * Search box focus animation
 * Dramatic expansion with blur background
 */
export function animateSearchFocus(searchBox: HTMLElement, isExpanded: boolean) {
  if (isExpanded) {
    gsap.to(searchBox, {
      scale: 1.02,
      boxShadow: '0 0 40px rgba(20, 110, 245, 0.3)',
      duration: 0.3,
      ease: 'power2.out',
    });
  } else {
    gsap.to(searchBox, {
      scale: 1,
      boxShadow: '0 0 0 rgba(20, 110, 245, 0)',
      duration: 0.3,
      ease: 'power2.in',
    });
  }
}

/**
 * Filter pill morph animation
 * Smooth color and border transition
 */
export function animateFilterToggle(pill: HTMLElement, isActive: boolean) {
  const activeColor = '#146EF5';
  const inactiveColor = '#222222';

  gsap.to(pill, {
    backgroundColor: isActive ? activeColor : inactiveColor,
    scale: isActive ? 1.05 : 1,
    duration: 0.3,
    ease: 'back.out(2)',
  });
}

/**
 * Floating logo animation
 * Subtle breathing/floating effect
 */
export function createFloatingLogoAnimation(logo: HTMLElement) {
  gsap.to(logo, {
    y: -10,
    duration: 2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });

  gsap.to(logo, {
    scale: 1.02,
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

/**
 * Scroll-based parallax for header
 * Logo scales slightly on scroll
 */
export function createHeaderParallax(header: HTMLElement) {
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: '+=500',
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.to(header, {
        opacity: 1 - progress * 0.3,
        scale: 1 - progress * 0.05,
        duration: 0.1,
      });
    },
  });
}

/**
 * Success animation for copy actions
 * Checkmark bounce with scale
 */
export function animateSuccessIcon(icon: HTMLElement) {
  const tl = gsap.timeline();

  tl.from(icon, {
    scale: 0,
    rotation: -180,
    duration: 0.4,
    ease: 'back.out(2)',
  })
    .to(icon, {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'sine.inOut',
    });

  return tl;
}

/**
 * Loading skeleton shimmer
 * Gradient shimmer effect for loading states
 */
export function createShimmerAnimation(element: HTMLElement) {
  gsap.to(element, {
    backgroundPosition: '200% center',
    duration: 1.5,
    ease: 'none',
    repeat: -1,
  });
}

/**
 * Export actions reveal
 * Slide up with stagger
 */
export function animateExportActions(container: HTMLElement) {
  const buttons = container.querySelectorAll('button');

  gsap.from(buttons, {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.5,
    ease: 'power2.out',
  });
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Safe animation wrapper
 * Respects prefers-reduced-motion
 */
export function safeAnimate(animationFn: () => void) {
  if (prefersReducedMotion()) {
    // Skip animations if user prefers reduced motion
    return;
  }

  animationFn();
}
