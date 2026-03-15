import type { Expense, Category, SubCategory } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Supervivencia', color: '#10B981', icon: 'HeartPulse' },
  { id: 'cat2', name: 'Ocio', color: '#F59E0B', icon: 'GlassWater' },
  { id: 'cat3', name: 'Cultura', color: '#6366F1', icon: 'Book' },
  { id: 'cat4', name: 'Extras', color: '#EF4444', icon: 'PlusCircle' },
];

export const MOCK_SUBCATEGORIES: SubCategory[] = [
  // Supervivencia
  { id: 's1', categoryId: 'cat1', name: 'Alimentación' },
  { id: 's2', categoryId: 'cat1', name: 'Transporte' },
  { id: 's3', categoryId: 'cat1', name: 'Salud' },
  
  // Ocio
  { id: 's4', categoryId: 'cat2', name: 'Restaurantes' },
  { id: 's5', categoryId: 'cat2', name: 'Tabaco/Bebida' },
  
  // Cultura
  { id: 's6', categoryId: 'cat3', name: 'Libros/Cine' },
  
  // Extras
  { id: 's7', categoryId: 'cat4', name: 'Ropa' },
  { id: 's8', categoryId: 'cat4', name: 'Regalos' },
];

export const MOCK_EXPENSES: Expense[] = [];
