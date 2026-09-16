import { AlertTriangle } from 'lucide-react';

const ModalConfirm = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', danger = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-surface-container rounded-2xl shadow-2xl border border-surface-container-highest p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${danger ? 'bg-red-500/10' : 'bg-accent/10'}`}>
            <AlertTriangle className={`size-6 ${danger ? 'text-red-500' : 'text-accent'}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-surface">{title}</h3>
            <p className="text-sm text-on-surface-variant mt-1">{message}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-sm font-medium transition-all cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              danger
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-primary hover:bg-primary/80 text-on-primary'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
