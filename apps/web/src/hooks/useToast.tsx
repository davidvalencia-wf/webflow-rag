/**
 * useToast Hook
 * Wrapper around react-hot-toast with Webflow branding
 */

import toast from 'react-hot-toast';

interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

/**
 * Success toast with Webflow styling
 */
export function showSuccessToast(message: string, options: ToastOptions = {}) {
  return toast.success(message, {
    duration: options.duration || 2000,
    position: options.position || 'bottom-center',
    style: {
      background: '#222222',
      color: '#FFFFFF',
      border: '1px solid #10B981',
      borderRadius: '8px',
      fontFamily: 'var(--font-inter)',
      fontSize: '14px',
      padding: '12px 16px',
    },
    iconTheme: {
      primary: '#10B981',
      secondary: '#FFFFFF',
    },
  });
}

/**
 * Error toast with Webflow styling
 */
export function showErrorToast(message: string, options: ToastOptions = {}) {
  return toast.error(message, {
    duration: options.duration || 3000,
    position: options.position || 'bottom-center',
    style: {
      background: '#222222',
      color: '#FFFFFF',
      border: '1px solid #EF4444',
      borderRadius: '8px',
      fontFamily: 'var(--font-inter)',
      fontSize: '14px',
      padding: '12px 16px',
    },
    iconTheme: {
      primary: '#EF4444',
      secondary: '#FFFFFF',
    },
  });
}

/**
 * Info toast with Webflow styling
 */
export function showInfoToast(message: string, options: ToastOptions = {}) {
  return toast(message, {
    duration: options.duration || 2000,
    position: options.position || 'bottom-center',
    icon: '💡',
    style: {
      background: '#222222',
      color: '#FFFFFF',
      border: '1px solid #146EF5',
      borderRadius: '8px',
      fontFamily: 'var(--font-inter)',
      fontSize: '14px',
      padding: '12px 16px',
    },
  });
}

/**
 * Loading toast (dismissible)
 */
export function showLoadingToast(message: string) {
  return toast.loading(message, {
    style: {
      background: '#222222',
      color: '#FFFFFF',
      border: '1px solid #363636',
      borderRadius: '8px',
      fontFamily: 'var(--font-inter)',
      fontSize: '14px',
      padding: '12px 16px',
    },
  });
}

/**
 * Custom toast with action button
 */
export function showActionToast(message: string, actionLabel: string, onAction: () => void) {
  return toast.custom((t) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: '#222222',
        color: '#FFFFFF',
        border: '1px solid #363636',
        borderRadius: '8px',
        padding: '12px 16px',
        fontFamily: 'var(--font-inter)',
        fontSize: '14px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
      }}
    >
      <span>{message}</span>
      <button
        onClick={() => {
          onAction();
          toast.dismiss(t.id);
        }}
        style={{
          background: '#146EF5',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '4px',
          padding: '6px 12px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {actionLabel}
      </button>
    </div>
  ), {
    duration: 4000,
  });
}

/**
 * Dismiss all toasts
 */
export function dismissAllToasts() {
  toast.dismiss();
}

const toastUtils = {
  success: showSuccessToast,
  error: showErrorToast,
  info: showInfoToast,
  loading: showLoadingToast,
  action: showActionToast,
  dismiss: dismissAllToasts,
};

export default toastUtils;
