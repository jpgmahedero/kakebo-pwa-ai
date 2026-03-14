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

export const MOCK_EXPENSES: Expense[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    amount: 15.50,
    categoryId: 'cat2', // Ocio
    subCategoryId: 's4', // Restaurantes
    type: 'variable',
    description: 'Cena con amigos',
    whoPaid: 'Jose',
    paymentMethod: 'Tarjeta',
    knownPlace: 'Pizzería Roma',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000).toISOString(),
    amount: 45.00,
    categoryId: 'cat1', // Supervivencia
    subCategoryId: 's2', // Transporte
    type: 'fixed',
    description: 'Abono mensual',
    whoPaid: 'Jose',
    paymentMethod: 'Tarjeta',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    date: new Date(Date.now() - 172800000).toISOString(),
    amount: 12.50,
    categoryId: 'cat3', // Cultura
    subCategoryId: 's6', // Libros/Cine
    type: 'variable',
    description: 'Libro nuevo',
    whoPaid: 'Jose',
    paymentMethod: 'Efectivo',
    knownPlace: 'Librería Central',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
