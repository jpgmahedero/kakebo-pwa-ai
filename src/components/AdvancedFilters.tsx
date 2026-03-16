import { Calendar, DollarSign, User, Filter, Tag } from 'lucide-react';
import type { ExpenseType } from '../types';
import { useExpenseStore } from '../store/useExpenseStore';

interface Props {
  isOpen: boolean;
  filters: {
    startDate: string;
    endDate: string;
    minAmount: string;
    maxAmount: string;
    whoPaid: string;
    type: ExpenseType | 'all';
    categoryId: string;
    subCategoryId: string;
  };
  setFilters: (filters: any) => void;
  onClear: () => void;
}

export function AdvancedFilters({ isOpen, filters, setFilters, onClear }: Props) {
  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white border-t border-gray-100 p-6 space-y-6 animate-in slide-in-from-top-4 duration-300">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600" /> Filtros Avanzados
        </h4>
        <button 
          onClick={onClear}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
        >
          Limpiar todos
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Rango de Fechas */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Rango de Fechas
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-50 border-0 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-50 border-0 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Rango de Importe */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> Rango de Importe (€)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Mín"
              value={filters.minAmount}
              onChange={(e) => handleChange('minAmount', e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-50 border-0 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <input
              type="number"
              placeholder="Máx"
              value={filters.maxAmount}
              onChange={(e) => handleChange('maxAmount', e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-50 border-0 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Quién pagó y Tipo */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <User className="w-3 h-3" /> Detalles
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Quién pagó..."
              value={filters.whoPaid}
              onChange={(e) => handleChange('whoPaid', e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-50 border-0 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <select
              value={filters.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-50 border-0 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
            >
              <option value="all">Tipo...</option>
              <option value="variable">Variables</option>
              <option value="fixed">Fijos</option>
            </select>
          </div>
        </div>

        {/* Categoría y Subcategoría */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <Tag className="w-3 h-3" /> Categorización
          </label>
          <div className="flex gap-2">
            <select
              value={filters.categoryId}
              onChange={(e) => {
                setFilters({ ...filters, categoryId: e.target.value, subCategoryId: '' });
              }}
              className="flex-1 px-3 py-2 bg-gray-50 border-0 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
            >
              <option value="">Categoría...</option>
              {useExpenseStore.getState().categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select
              value={filters.subCategoryId}
              onChange={(e) => handleChange('subCategoryId', e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-50 border-0 rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
              disabled={!filters.categoryId}
            >
              <option value="">Subcategoría...</option>
              {useExpenseStore.getState().subCategories
                .filter(sub => sub.categoryId === filters.categoryId)
                .map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))
              }
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
