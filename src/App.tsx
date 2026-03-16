import { useState } from 'react';
import type { Expense, ExpenseType } from './types';
import { useExpenseStore } from './store/useExpenseStore';
import { ExpenseList } from './components/ExpenseList';
import { AddExpenseForm } from './components/AddExpenseForm';
import { AdvancedFilters } from './components/AdvancedFilters';
import { Plus, Wallet, TrendingDown, Search, SlidersHorizontal } from 'lucide-react';
import './index.css';

const INITIAL_FILTERS = {
  startDate: '',
  endDate: '',
  minAmount: '',
  maxAmount: '',
  whoPaid: '',
  type: 'all' as ExpenseType | 'all'
};

function App() {
  const { expenses, categories, places, addExpense, updateExpense } = useExpenseStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Advanced filters state
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(INITIAL_FILTERS);
  
  const handleSaveExpense = (expenseData: any) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
    } else {
      const newExpense: Expense = {
        ...expenseData,
        id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addExpense(newExpense);
    }
    
    setIsFormOpen(false);
    setEditingExpense(null);
  };

  const handleOpenAddForm = () => {
    setEditingExpense(null);
    setIsFormOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  // Calculate filtered expenses
  const filteredExpenses = expenses.filter(expense => {
    const category = categories.find(c => c.id === expense.categoryId);
    const place = places.find(p => p.id === expense.placeId);
    const placeName = place?.name || expense.knownPlace || '';
    
    // 1. Basic search query
    const query = searchQuery.toLowerCase();
    const matchesSearch = query === '' || 
      (expense.description?.toLowerCase().includes(query)) ||
      (category?.name.toLowerCase().includes(query)) ||
      (placeName.toLowerCase().includes(query));

    if (!matchesSearch) return false;

    // 2. Advanced filters
    const expenseDate = new Date(expense.date).toISOString().split('T')[0];
    
    // Date Range
    if (advancedFilters.startDate && expenseDate < advancedFilters.startDate) return false;
    if (advancedFilters.endDate && expenseDate > advancedFilters.endDate) return false;

    // Amount Range
    if (advancedFilters.minAmount && expense.amount < parseFloat(advancedFilters.minAmount)) return false;
    if (advancedFilters.maxAmount && expense.amount > parseFloat(advancedFilters.maxAmount)) return false;

    // Who Paid
    if (advancedFilters.whoPaid && !expense.whoPaid.toLowerCase().includes(advancedFilters.whoPaid.toLowerCase())) return false;

    // Type
    if (advancedFilters.type !== 'all' && expense.type !== advancedFilters.type) return false;

    return true;
  });

  // Calculate total (we show the total of all expenses currently existing in view, or all?)
  // Let's show the total of all as a general summary (existing behavior)
  const totalAmount = expenses.reduce((sum: number, exp: any) => sum + exp.amount, 0);

  const hasActiveAdvancedFilters = Object.values(advancedFilters).some(v => v !== '' && v !== 'all');
  
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900 pb-24">
      
      {/* Premium Header */}
      <header className="bg-indigo-600 px-6 pt-12 pb-24 rounded-b-[2.5rem] shadow-sm relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-20 -left-10 w-32 h-32 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6 text-white">
            <div>
              <p className="text-indigo-100 text-sm font-medium tracking-wide">Hola, Jose</p>
              <h1 className="text-2xl font-bold tracking-tight">Kakebo</h1>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
              <Wallet className="w-5 h-5" />
            </div>
          </div>

          <div className="text-center mt-2">
            <p className="text-indigo-100 text-sm font-medium uppercase tracking-wider mb-1">Gasto Total</p>
            <h2 className="text-5xl font-extrabold text-white tracking-tighter">
              {totalAmount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-2xl font-semibold opacity-70">€</span>
            </h2>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 relative -mt-10 z-20">
        
        {/* Main Expenses Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100/50 p-4 sm:p-6 mb-8 backdrop-blur-xl bg-white/95">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <TrendingDown className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Últimos movimientos</h3>
            </div>
            <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 transition-colors py-1 px-3 rounded-full hover:bg-indigo-50">
              Ver todos
            </button>
          </div>

          <div className="relative mb-4 px-2 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-600/5 focus:bg-white transition-all outline-none placeholder:text-gray-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 hover:text-gray-600 bg-gray-200/50 w-5 h-5 flex items-center justify-center rounded-full"
                >
                  ×
                </button>
              )}
            </div>
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`p-3 rounded-2xl transition-all border flex items-center justify-center relative ${
                isFiltersOpen || hasActiveAdvancedFilters
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : 'bg-gray-50/50 border-gray-100 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              {hasActiveAdvancedFilters && !isFiltersOpen && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
          </div>

          <AdvancedFilters 
            isOpen={isFiltersOpen}
            filters={advancedFilters}
            setFilters={setAdvancedFilters}
            onClear={() => setAdvancedFilters(INITIAL_FILTERS)}
          />
          
          <div className="mt-4">
            <ExpenseList 
              expenses={filteredExpenses} 
              onExpenseClick={handleEditExpense} 
            />
          </div>
        </div>
        
      </main>

      {/* Floating Action Button (FAB) */}
      <button 
        onClick={handleOpenAddForm}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-16 h-16 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200 flex items-center justify-center text-white hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 z-40 group border border-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        aria-label="Añadir nuevo gasto"
      >
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Add Expense Modal */}
      <AddExpenseForm 
        isOpen={isFormOpen} 
        onClose={() => {
          setIsFormOpen(false);
          setEditingExpense(null);
        }} 
        onSave={handleSaveExpense}
        initialData={editingExpense}
      />

    </div>
  )
}

export default App
