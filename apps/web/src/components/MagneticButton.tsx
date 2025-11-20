/**
 * MagneticButton Component
 * Button with magnetic hover effect (follows cursor)
 */

'use client';

import { useRef } from 'react';
import { useMagneticEffect } from '@/hooks/useAnimations';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  disabled?: boolean;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  onClick,
  className,
  style,
  strength = 0.3,
  disabled,
  ariaLabel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useMagneticEffect(buttonRef, strength);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={className}
      style={style}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
