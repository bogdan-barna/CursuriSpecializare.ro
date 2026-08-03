import React from 'react';
import { ToastMessage } from '../../types';
import { CheckCircle2, Info, ShieldCheck, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto p-4 rounded-[8px] bg-[#0B1C30] text-white border border-[#1E2E44] shadow-xl flex items-start justify-between space-x-3 transition-all animate-in fade-in slide-in-from-bottom-5"
        >
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-[8px] bg-[#0062FF] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              {t.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : t.type === 'info' ? (
                <Info className="w-4 h-4" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">{t.title}</h4>
              <p className="text-xs text-[#CBD5E1] mt-0.5 leading-relaxed">
                {t.message}
              </p>
            </div>
          </div>
          <button
            onClick={() => onDismiss(t.id)}
            className="text-[#94A3B8] hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
