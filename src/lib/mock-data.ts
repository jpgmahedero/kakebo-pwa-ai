import type { Expense, Category } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  // Supervivencia
  { id: 'c1', pillar: 'Supervivencia', name: 'Alimentación', color: '#10B981', icon: 'Utensils' },
  { id: 'c2', pillar: 'Supervivencia', name: 'Transporte', color: '#3B82F6', icon: 'Bus' },
  { id: 'c3', pillar: 'Supervivencia', name: 'Salud', color: '#EF4444', icon: 'Heart' },
  
  // Ocio
  { id: 'c4', pillar: 'Ocio', name: 'Restaurantes', color: '#F59E0B', icon: 'GlassWater' },
  { id: 'c5', pillar: 'Ocio', name: 'Tabaco/Bebida', color: '#8B5CF6', icon: 'Beer' },
  
  // Cultura
  { id: 'c6', pillar: 'Cultura', name: 'Libros/Cine', color: '#6366F1', icon: 'Book' },
  
  // Extras
  { id: 'c7', pillar: 'Extras', name: 'Ropa', color: '#EC4899', icon: 'Shirt' },
  { id: 'c8', pillar: 'Extras', name: 'Regalos', color: '#06B6D4', icon: 'Gift' },
];

export const MOCK_EXPENSES: Expense[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    amount: 15.50,
    categoryId: 'c4', // Restaurantes
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
    categoryId: 'c2', // Transporte
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
    categoryId: 'c6', // Cultura
    type: 'variable',
    description: 'Libro nuevo',
    whoPaid: 'Jose',
    paymentMethod: 'Efectivo',
    knownPlace: 'Librería Central',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
