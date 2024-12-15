import { create } from 'zustand';
import { Toaster, toast } from 'sonner';

interface Toast {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface ToastState {
  showToast: (toast: Toast) => void;
}

export const useToast = create<ToastState>((set) => ({
  showToast: ({ title, description, type = 'info', duration = 4000 }) => {
    switch (type) {
      case 'success':
        toast.success(title, {
          description,
          duration,
        });
        break;
      case 'error':
        toast.error(title, {
          description,
          duration,
        });
        break;
      case 'warning':
        toast.warning(title, {
          description,
          duration,
        });
        break;
      default:
        toast(title, {
          description,
          duration,
        });
    }
  },
}));

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
    />
  );
}
