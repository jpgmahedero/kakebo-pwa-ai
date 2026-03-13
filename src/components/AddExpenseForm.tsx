import { useState } from 'react';
import { X } from 'lucide-react';
import { MOCK_CATEGORIES } from '../lib/mock-data';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (expenseData: any) => void;
}

export function AddExpenseForm({ isOpen, onClose, onSave }: Props) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(MOCK_CATEGORIES[0].id);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onSave({
      amount: parseFloat(amount),
      description,
      categoryId,
      date: new Date().toISOString(),
      type: 'variable',
      paymentMethod: 'Efectivo', // Default for MVP
    });

    // Reset form
    setAmount('');
    setDescription('');
    setCategoryId(MOCK_CATEGORIES[0].id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Surface */}
      <div className="relative bg-white w-full sm:max-w-md rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10 pt-6 pb-4">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Nuevo Gasto</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Amount Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cantidad</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-medium">€</span>
              <input 
                type="number" 
                step="0.01"
                min="0"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-2xl font-bold text-gray-900 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all placeholder:text-gray-300"
                autoFocus
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
            <input 
              type="text" 
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Cena en restaurante"
              className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl text-gray-900 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
            <div className="grid grid-cols-3 gap-2">
              {MOCK_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryId(cat.id)}
                  className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                    categoryId === cat.id 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-2 ring-indigo-600 ring-offset-2' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Spacer for mobile bottom navigation safe area */}
          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-gray-900 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-black transition-transform active:scale-[0.98]"
            >
              Guardar Gasto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
