import { useMemo } from 'react';
import { Settings, Target, Wallet } from 'lucide-react';
import { useExpenseStore } from '../store/useExpenseStore';

interface Props {
  currentMonth: number;
  currentYear: number;
  onOpenSetup: () => void;
}

export function MonthlyBudgetHeader({ currentMonth, currentYear, onOpenSetup }: Props) {
  const { monthlyPlans, expenses } = useExpenseStore();

  const plan = monthlyPlans.find(p => p.month === currentMonth && p.year === currentYear);

  const {
    totalIncome,
    totalFixed,
    savingsGoal,
    totalVariableSpent,
    availableTotal,
    availableToday
  } = useMemo(() => {
    if (!plan) {
      return {
        totalIncome: 0,
        totalFixed: 0,
        savingsGoal: 0,
        totalVariableSpent: 0,
        availableTotal: 0,
        availableToday: 0
      };
    }

    const tIncome = plan.incomes.reduce((acc, i) => acc + (i.amount || 0), 0);
    const tFixed = plan.fixedExpenses.reduce((acc, f) => acc + (f.amount || 0), 0);
    const sGoal = plan.savingsGoal || 0;

    // Filter current month expenses
    const currentMonthExpenses = expenses.filter(e => {
      const date = new Date(e.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const tVariableSpent = currentMonthExpenses
      .filter(e => e.type === 'variable')
      .reduce((acc, e) => acc + e.amount, 0);

    const aTotal = tIncome - tFixed - sGoal;

    const today = new Date();
    // Use last day of month if currentMonth is not the actual current month
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let currentDay = today.getDate();
    if (currentMonth !== today.getMonth() || currentYear !== today.getFullYear()) {
      currentDay = daysInMonth;
    }
    const daysRemaining = Math.max(1, daysInMonth - currentDay + 1);

    const aToday = (aTotal - tVariableSpent) / daysRemaining;

    return {
      totalIncome: tIncome,
      totalFixed: tFixed,
      savingsGoal: sGoal,
      totalVariableSpent: tVariableSpent,
      availableTotal: aTotal,
      availableToday: aToday
    };
  }, [plan, expenses, currentMonth, currentYear]);

  const percentageSpent = availableTotal > 0 ? (totalVariableSpent / availableTotal) * 100 : 0;
  const isOverBudget = totalVariableSpent > availableTotal;

  if (!plan) {
    return (
      <div className="bg-indigo-600/20 backdrop-blur-md rounded-[2rem] p-6 text-center border border-indigo-500/30 text-white shadow-inner mb-6 relative overflow-hidden">
        <h3 className="text-lg font-bold mb-2">No hay plan para este mes</h3>
        <p className="text-indigo-200 text-sm mb-4">Configura tus ingresos y gastos fijos para calcular tu presupuesto Kakebo.</p>
        <button 
          onClick={onOpenSetup}
          className="bg-white text-indigo-900 px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform"
        >
          Configurar Mes
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-[2rem] p-6 text-white shadow-xl mb-6 relative overflow-hidden border border-white/20">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
            <Wallet className="w-3 h-3" /> Disponible hoy
          </p>
          <div className="flex items-baseline gap-1">
            <h2 className="text-4xl font-extrabold tracking-tighter">
              {availableToday.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h2>
            <span className="text-xl font-semibold opacity-70">€</span>
          </div>
        </div>
        <button 
          onClick={onOpenSetup}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          title="Configurar Presupuesto"
        >
          <Settings className="w-5 h-5 text-indigo-100" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-semibold text-indigo-100 mb-2">
          <span>Gastado: {totalVariableSpent.toLocaleString('es-ES', { minimumFractionDigits: 0 })}€</span>
          <span>Total: {availableTotal.toLocaleString('es-ES', { minimumFractionDigits: 0 })}€</span>
        </div>
        <div className="h-3 w-full bg-indigo-900/40 rounded-full overflow-hidden flex">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${isOverBudget ? 'bg-red-400' : 'bg-emerald-400'}`}
            style={{ width: `${Math.min(100, percentageSpent)}%` }}
          />
        </div>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-white/10">
        <div>
          <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider mb-1">Ingresos</p>
          <p className="text-sm font-semibold">{totalIncome.toLocaleString('es-ES', { minimumFractionDigits: 0 })}€</p>
        </div>
        <div>
          <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider mb-1">Fijos</p>
          <p className="text-sm font-semibold">{totalFixed.toLocaleString('es-ES', { minimumFractionDigits: 0 })}€</p>
        </div>
        <div>
          <p className="text-[10px] text-indigo-200 uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
            <Target className="w-3 h-3" /> Ahorro
          </p>
          <p className="text-sm font-semibold text-blue-200">{savingsGoal.toLocaleString('es-ES', { minimumFractionDigits: 0 })}€</p>
        </div>
      </div>
    </div>
  );
}
