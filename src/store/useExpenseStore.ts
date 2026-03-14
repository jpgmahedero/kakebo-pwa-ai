import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';
import type { Expense, Category, SubCategory } from '../types';
import { MOCK_CATEGORIES, MOCK_SUBCATEGORIES } from '../lib/mock-data';

interface ExpenseState {
  expenses: Expense[];
  categories: Category[];
  subCategories: SubCategory[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => void;
  addCategory: (category: Category) => void;
  addSubCategory: (subCategory: SubCategory) => void;
  removeSubCategory: (id: string) => void;
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
      categories: MOCK_CATEGORIES,
      subCategories: MOCK_SUBCATEGORIES,
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
      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, category] })),
      addSubCategory: (subCategory) =>
        set((state) => ({ subCategories: [...state.subCategories, subCategory] })),
      removeSubCategory: (id) =>
        set((state) => ({ subCategories: state.subCategories.filter(s => s.id !== id) })),
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
