/**
 * AnimatedCounter Component
 * Odometer-style counter animation for stats
 */

'use client';

import { useRef } from 'react';
import { useCounterAnimation } from '@/hooks/useAnimations';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedCounter({ target, duration = 1.5, className, style }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useCounterAnimation(ref, target, duration);

  return (
    <span ref={ref} className={className} style={style}>
      {target.toLocaleString()}
    </span>
  );
}
