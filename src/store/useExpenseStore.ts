import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage';
import type { Expense, Category, SubCategory, Place } from '../types';
import { MOCK_CATEGORIES, MOCK_SUBCATEGORIES, MOCK_PLACES, MOCK_EXPENSES } from '../lib/mock-data';

interface ExpenseState {
  expenses: Expense[];
  categories: Category[];
  subCategories: SubCategory[];
  places: Place[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => void;
  addCategory: (category: Category) => void;
  addSubCategory: (subCategory: SubCategory) => void;
  removeSubCategory: (id: string) => void;
  addPlace: (place: Place) => void;
  removePlace: (id: string) => void;
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
      expenses: MOCK_EXPENSES,
      categories: MOCK_CATEGORIES,
      subCategories: MOCK_SUBCATEGORIES,
      places: MOCK_PLACES,
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
      addPlace: (place) =>
        set((state) => ({ places: [...state.places, place] })),
      removePlace: (id) =>
        set((state) => ({ places: state.places.filter(p => p.id !== id) })),
      clearExpenses: () => set({ expenses: [] }),
    }),
    {
      name: 'kakebo-storage',
      version: 4, // Incrementado para cargar gastos de prueba
      storage: createJSONStorage(() => localforage as any),
    }
  )
);
