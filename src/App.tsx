import { useState } from 'react';
import type { Expense } from './types';
import { useExpenseStore } from './store/useExpenseStore';
import { ExpenseList } from './components/ExpenseList';
import { AddExpenseForm } from './components/AddExpenseForm';
import { Plus, Wallet, TrendingDown } from 'lucide-react';
import './index.css';

function App() {
  const { expenses, addExpense, updateExpense } = useExpenseStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  
  const handleSaveExpense = (expenseData: any) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
    } else {
      const newExpense: Expense = {
        ...expenseData,
        id: crypto.randomUUID(),
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

  // Calculate total
  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
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
          
          <ExpenseList 
            expenses={expenses} 
            onExpenseClick={handleEditExpense} 
          />
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
