import { useState } from 'react';
import { X, MapPin, Store, User, Calendar, Tag } from 'lucide-react';
import { MOCK_CATEGORIES } from '../lib/mock-data';
import type { Pillar, ExpenseType } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (expenseData: any) => void;
}

const PILLARS: Pillar[] = ['Supervivencia', 'Ocio', 'Cultura', 'Extras'];

export function AddExpenseForm({ isOpen, onClose, onSave }: Props) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(MOCK_CATEGORIES[0].id);
  const [whoPaid, setWhoPaid] = useState('Jose');
  const [knownPlace, setKnownPlace] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<ExpenseType>('variable');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [activePillar, setActivePillar] = useState<Pillar>('Supervivencia');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onSave({
      amount: parseFloat(amount),
      description,
      categoryId,
      date: new Date(date).toISOString(),
      type,
      knownPlace,
      location,
      whoPaid,
      paymentMethod: 'Tarjeta', // Default
    });

    // Reset form
    setAmount('');
    setDescription('');
    setWhoPaid('Jose');
    setKnownPlace('');
    setLocation('');
    setDate(new Date().toISOString().slice(0, 16));
  };

  const filteredCategories = MOCK_CATEGORIES.filter(cat => cat.pillar === activePillar);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Surface */}
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-200 my-auto">
        
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
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Amount & Type */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cantidad</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-medium">€</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-2xl text-2xl font-bold text-gray-900 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all"
                  autoFocus
                />
              </div>
            </div>
            <div className="w-32">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tipo</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value as ExpenseType)}
                className="w-full px-3 py-4 bg-gray-50 border-0 rounded-2xl text-sm font-bold text-gray-700 focus:ring-4 focus:ring-indigo-600/10"
              >
                <option value="variable">Variables</option>
                <option value="fixed">Fijo</option>
              </select>
            </div>
          </div>

          {/* Date & Who */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Fecha y Hora
              </label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-4 focus:ring-indigo-600/10"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <User className="w-3 h-3" /> Quién pagó
              </label>
              <input
                type="text"
                value={whoPaid}
                onChange={(e) => setWhoPaid(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-4 focus:ring-indigo-600/10"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Descripción</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Cena en restaurante"
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-4 focus:ring-indigo-600/10 focus:bg-white transition-all"
            />
          </div>

          {/* Place & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Store className="w-3 h-3" /> Sitio
              </label>
              <input
                type="text"
                value={knownPlace}
                onChange={(e) => setKnownPlace(e.target.value)}
                placeholder="Ej. Mercadona"
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-4 focus:ring-indigo-600/10"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Ubicación
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ciudad, Calle..."
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-4 focus:ring-indigo-600/10"
              />
            </div>
          </div>

          {/* Kakebo Hierarchy: Pillar -> Category */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Tag className="w-3 h-3" /> Categoría (Pilar Kakebo)
            </label>
            
            {/* Pillars as Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto no-scrollbar">
              {PILLARS.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActivePillar(p)}
                  className={`flex-1 min-w-[80px] py-2 px-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                    activePillar === p ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Sub-categories (Categories) */}
            <div className="grid grid-cols-3 gap-2">
              {filteredCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryId(cat.id)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border-2 ${
                    categoryId === cat.id
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-600 shadow-sm'
                      : 'bg-white border-transparent text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 sticky bottom-0 bg-white pb-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]"
            >
              Guardar Gasto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
