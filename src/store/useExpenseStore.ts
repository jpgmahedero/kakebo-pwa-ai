import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';
import type { Expense, Category, SubCategory, Place } from '../types';
import { MOCK_CATEGORIES, MOCK_SUBCATEGORIES, MOCK_PLACES, MOCK_EXPENSES } from '../lib/mock-data';

interface ExpenseState {
  expenses: Expense[];
  deletedExpenses: Expense[];
  categories: Category[];
  subCategories: SubCategory[];
  places: Place[];
  monthlyPlans: import('../types').MonthlyPlan[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  restoreExpense: (id: string) => void;
  permanentlyDeleteExpense: (id: string) => void;
  clearDeletedExpenses: () => void;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => void;
  addCategory: (category: Category) => void;
  addSubCategory: (subCategory: SubCategory) => void;
  removeSubCategory: (id: string) => void;
  addPlace: (place: Place) => void;
  removePlace: (id: string) => void;
  clearExpenses: () => void;
  addOrUpdateMonthlyPlan: (plan: import('../types').MonthlyPlan) => void;
}

// Configura localforage para que use IndexedDB por defecto
localforage.config({
  name: 'KakeboApp',
  storeName: 'kakebo_expenses'
});

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: MOCK_EXPENSES,
      deletedExpenses: [],
      categories: MOCK_CATEGORIES,
      subCategories: MOCK_SUBCATEGORIES,
      places: MOCK_PLACES,
      monthlyPlans: [],
      addExpense: (expense) =>
        set((state) => ({ expenses: [expense, ...state.expenses] })),
      // Soft delete: move to deletedExpenses
      removeExpense: (id) =>
        set((state) => {
          const expense = state.expenses.find((e) => e.id === id);
          if (!expense) return state;
          return {
            expenses: state.expenses.filter((e) => e.id !== id),
            deletedExpenses: [expense, ...state.deletedExpenses],
          };
        }),
      // Restore from deletedExpenses back to expenses
      restoreExpense: (id) =>
        set((state) => {
          const expense = state.deletedExpenses.find((e) => e.id === id);
          if (!expense) return state;
          return {
            deletedExpenses: state.deletedExpenses.filter((e) => e.id !== id),
            expenses: [expense, ...state.expenses],
          };
        }),
      // Permanently remove from deletedExpenses
      permanentlyDeleteExpense: (id) =>
        set((state) => ({
          deletedExpenses: state.deletedExpenses.filter((e) => e.id !== id),
        })),
      // Clear all deleted expenses
      clearDeletedExpenses: () => set({ deletedExpenses: [] }),
      updateExpense: (id, updatedExpense) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, ...updatedExpense, updatedAt: new Date().toISOString() } : e
          ),
        })),
      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, category] })),
      addSubCategory: (subCategory) =>
        set((state) => ({ subCategories: [...state.subCategories, subCategory] })),
      removeSubCategory: (id) =>
        set((state) => ({ subCategories: state.subCategories.filter(s => s.id !== id) })),
      addPlace: (place) =>
        set((state) => ({ places: [...state.places, place] })),
      removePlace: (id) =>
        set((state) => ({ places: state.places.filter(p => p.id !== id) })),
      clearExpenses: () => set({ expenses: [] }),
      addOrUpdateMonthlyPlan: (plan) =>
        set((state) => {
          const existingIndex = state.monthlyPlans.findIndex(
            (p) => p.month === plan.month && p.year === plan.year
          );
          if (existingIndex >= 0) {
            const newPlans = [...state.monthlyPlans];
            newPlans[existingIndex] = { ...newPlans[existingIndex], ...plan };
            return { monthlyPlans: newPlans };
          } else {
            return { monthlyPlans: [...state.monthlyPlans, plan] };
          }
        }),
    }),
    {
      name: 'kakebo-storage',
      version: 6, // Incrementado para inicializar monthlyPlans
      storage: createJSONStorage(() => localforage as any),
    }
  )
);
