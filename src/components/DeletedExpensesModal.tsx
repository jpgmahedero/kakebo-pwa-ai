import { useExpenseStore } from '../store/useExpenseStore';
import { formatCurrency, formatDateString } from '../lib/utils';
import * as LucideIcons from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function DeletedExpensesModal({ isOpen, onClose }: Props) {
  const { deletedExpenses, restoreExpense, permanentlyDeleteExpense, clearDeletedExpenses } =
    useExpenseStore();

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900">Gastos borrados recientemente</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <LucideIcons.X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {deletedExpenses.length === 0 ? (
            <p className="text-center text-gray-500">No hay gastos borrados.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {deletedExpenses.map((exp) => (
                <li key={exp.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">
                      -{formatCurrency(exp.amount)} {exp.description && `· ${exp.description}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateString(exp.date)}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => restoreExpense(exp.id)}
                      className="p-1 text-green-600 hover:text-green-800 transition-colors"
                      title="Restaurar"
                    >
                      <LucideIcons.ArrowLeftCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => permanentlyDeleteExpense(exp.id)}
                      className="p-1 text-red-600 hover:text-red-800 transition-colors"
                      title="Eliminar permanentemente"
                    >
                      <LucideIcons.Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50/30">
          <button
            onClick={clearDeletedExpenses}
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
          >
            Vaciar lista
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
