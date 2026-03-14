import type { Expense } from '../types';
import { MOCK_CATEGORIES, MOCK_SUBCATEGORIES } from '../lib/mock-data';
import { formatCurrency, formatDateString } from '../lib/utils';
import * as LucideIcons from 'lucide-react';
import { createElement } from 'react';

interface Props {
  expenses: Expense[];
}

// Helper para renderizar iconos dinámicamente desde el string name en la base de datos
const IconMap = (name: string, props: any) => {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.ShoppingCart;
  return createElement(IconComponent, props);
};

export function ExpenseList({ expenses }: Props) {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
          <LucideIcons.Receipt className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-900 font-medium">No hay gastos registrados</p>
        <p className="text-gray-500 text-sm mt-1 text-center max-w-sm">
          Añade tu primer gasto con el botón inferior para empezar a llevar el control.
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-50">
      {expenses.map((expense) => {
        const category = MOCK_CATEGORIES.find(c => c.id === expense.categoryId);
        const subCategory = MOCK_SUBCATEGORIES.find(s => s.id === expense.subCategoryId);
        const dateObj = new Date(expense.date);
        const timeStr = dateObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        
        return (
          <li key={expense.id} className="py-4 hover:bg-gray-50/50 transition-colors rounded-2xl px-3 -mx-3 flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                style={{ backgroundColor: `${category?.color || '#9CA3AF'}15`, color: category?.color || '#9CA3AF' }}
              >
                {IconMap(category?.icon || 'ShoppingCart', { size: 22, strokeWidth: 2.2 })}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-gray-900 leading-tight line-clamp-1">{expense.description}</p>
                  {expense.knownPlace && (
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter truncate">
                      @ {expense.knownPlace}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                    {category?.name || 'Categoría'}
                  </span>
                  {subCategory && (
                    <span className="text-gray-400">
                      {subCategory.name}
                    </span>
                  )}
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <LucideIcons.User className="w-2.5 h-2.5" /> {expense.whoPaid}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0 ml-4">
              <p className="font-extrabold text-gray-900 text-lg tracking-tight">
                -{formatCurrency(expense.amount)}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5 font-bold tabular-nums">
                {formatDateString(expense.date)} • {timeStr}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
