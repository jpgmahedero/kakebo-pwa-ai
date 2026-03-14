import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';
import type { Expense } from '../types';

interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => void;
  clearExpenses: () => void;
}

// Configura localforage para que use IndexedDB por defecto
localforage.config({
  name: 'KakeboApp',
  storeName: 'kakebo_expenses'
});

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: [],
      addExpense: (expense) =>
        set((state) => ({ expenses: [expense, ...state.expenses] })),
      removeExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
      updateExpense: (id, updatedExpense) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, ...updatedExpense, updatedAt: new Date().toISOString() } : e
          ),
        })),
      clearExpenses: () => set({ expenses: [] }),
    }),
    {
      name: 'expense-storage',
      // Usa localforage como motor de persistencia (usa IndexedDB optimizadamente)
      storage: createJSONStorage(() => ({
        getItem: async (name: string): Promise<string | null> => {
          return (await localforage.getItem(name)) || null;
        },
        setItem: async (name: string, value: string): Promise<void> => {
          await localforage.setItem(name, value);
        },
        removeItem: async (name: string): Promise<void> => {
          await localforage.removeItem(name);
        },
      })),
    }
  )
);
