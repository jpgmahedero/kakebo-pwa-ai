import { useState, useEffect } from 'react';
import { X, DollarSign, Target, Calendar, Plus, Trash2 } from 'lucide-react';
import { useExpenseStore } from '../store/useExpenseStore';
import type { Income, FixedExpense, MonthlyPlan } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentMonth: number;
  currentYear: number;
}

export function BudgetSetupModal({ isOpen, onClose, currentMonth, currentYear }: Props) {
  const { monthlyPlans, addOrUpdateMonthlyPlan, categories } = useExpenseStore();
  
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [savingsGoal, setSavingsGoal] = useState<number>(0);
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>([]);

  useEffect(() => {
    if (isOpen) {
      const plan = monthlyPlans.find(p => p.month === currentMonth && p.year === currentYear);
      if (plan) {
        setIncomes(plan.incomes || []);
        setSavingsGoal(plan.savingsGoal || 0);
        setFixedExpenses(plan.fixedExpenses || []);
      } else {
        setIncomes([]);
        setSavingsGoal(0);
        setFixedExpenses([]);
      }
    }
  }, [isOpen, currentMonth, currentYear, monthlyPlans]);

  if (!isOpen) return null;

  const handleAddIncome = () => {
    setIncomes([...incomes, { 
      id: crypto.randomUUID(), 
      amount: 0, 
      description: '', 
      source: '', 
      date: new Date().toISOString() 
    }]);
  };

  const handleAddFixedExpense = () => {
    setFixedExpenses([...fixedExpenses, { 
      id: crypto.randomUUID(), 
      amount: 0, 
      description: '', 
      categoryId: categories.length > 0 ? categories[0].id : '', 
      date: new Date().toISOString() 
    }]);
  };

  const handleSave = () => {
    const plan: MonthlyPlan = {
      month: currentMonth,
      year: currentYear,
      incomes,
      savingsGoal,
      fixedExpenses
    };
    addOrUpdateMonthlyPlan(plan);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900">Plan Mensual Kakebo</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8 overflow-y-auto">
          {/* Ingresos */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" /> Ingresos
              </h3>
              <button type="button" onClick={handleAddIncome} className="text-xs text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1">
                <Plus className="w-3 h-3" /> Añadir Ingreso
              </button>
            </div>
            {incomes.length === 0 && <p className="text-sm text-gray-500 italic">No hay ingresos definidos.</p>}
            <div className="space-y-3">
              {incomes.map((income, index) => (
                <div key={income.id} className="flex gap-3 items-center animate-in fade-in">
                  <input type="text" placeholder="Descripción (ej. Nómina)" value={income.description} onChange={(e) => {
                    const newIncomes = [...incomes];
                    newIncomes[index].description = e.target.value;
                    setIncomes(newIncomes);
                  }} className="flex-1 px-3 py-2 bg-gray-50 rounded-xl text-sm border-0 focus:ring-2 focus:ring-indigo-500" />
                  <input type="number" placeholder="0.00" value={income.amount || ''} onChange={(e) => {
                    const newIncomes = [...incomes];
                    newIncomes[index].amount = parseFloat(e.target.value) || 0;
                    setIncomes(newIncomes);
                  }} className="w-28 px-3 py-2 bg-gray-50 rounded-xl text-sm font-bold text-gray-900 border-0 focus:ring-2 focus:ring-indigo-500" />
                  <button type="button" onClick={() => setIncomes(incomes.filter(i => i.id !== income.id))} className="text-gray-400 hover:text-red-500 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Ahorro */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" /> Objetivo de Ahorro
            </h3>
            <div className="flex gap-3 items-center">
              <span className="text-gray-500 text-sm">Quiero ahorrar:</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">€</span>
                <input type="number" placeholder="0.00" value={savingsGoal || ''} onChange={(e) => setSavingsGoal(parseFloat(e.target.value) || 0)} className="w-32 pl-8 pr-3 py-2 bg-gray-50 rounded-xl text-sm font-bold text-gray-900 border-0 focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </section>

          {/* Gastos Fijos */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-500" /> Gastos Fijos
              </h3>
              <button type="button" onClick={handleAddFixedExpense} className="text-xs text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1">
                <Plus className="w-3 h-3" /> Añadir Gasto Fijo
              </button>
            </div>
            {fixedExpenses.length === 0 && <p className="text-sm text-gray-500 italic">No hay gastos fijos definidos.</p>}
            <div className="space-y-3">
              {fixedExpenses.map((expense, index) => (
                <div key={expense.id} className="flex gap-3 items-center animate-in fade-in flex-wrap sm:flex-nowrap">
                  <input type="text" placeholder="Descripción (ej. Alquiler)" value={expense.description} onChange={(e) => {
                    const newExpenses = [...fixedExpenses];
                    newExpenses[index].description = e.target.value;
                    setFixedExpenses(newExpenses);
                  }} className="flex-[2] px-3 py-2 bg-gray-50 rounded-xl text-sm border-0 focus:ring-2 focus:ring-indigo-500 min-w-[120px]" />
                  <select value={expense.categoryId} onChange={(e) => {
                    const newExpenses = [...fixedExpenses];
                    newExpenses[index].categoryId = e.target.value;
                    setFixedExpenses(newExpenses);
                  }} className="flex-1 px-3 py-2 bg-gray-50 rounded-xl text-xs font-bold border-0 focus:ring-2 focus:ring-indigo-500 min-w-[100px] appearance-none">
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                  <input type="number" placeholder="0.00" value={expense.amount || ''} onChange={(e) => {
                    const newExpenses = [...fixedExpenses];
                    newExpenses[index].amount = parseFloat(e.target.value) || 0;
                    setFixedExpenses(newExpenses);
                  }} className="w-24 px-3 py-2 bg-gray-50 rounded-xl text-sm font-bold text-gray-900 border-0 focus:ring-2 focus:ring-indigo-500" />
                  <button type="button" onClick={() => setFixedExpenses(fixedExpenses.filter(e => e.id !== expense.id))} className="text-gray-400 hover:text-red-500 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/30">
          <button onClick={onClose} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
            Cancelar
          </button>
          <button onClick={handleSave} className="px-5 py-2.5 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-black transition-colors">
            Guardar Plan
          </button>
        </div>
      </div>
    </div>
  );
}
