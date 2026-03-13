import type { Expense } from '../types';

export const MOCK_EXPENSES: Expense[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    amount: 15.50,
    categoryId: 'c1', // Comida
    subCategoryId: 'sc1', // Restaurante
    type: 'variable',
    description: 'Menú del día',
    paymentMethod: 'Tarjeta de crédito',
    location: 'Centro',
    knownPlace: 'El Buen Sabor',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    amount: 45.00,
    categoryId: 'c2', // Transporte
    type: 'fixed',
    description: 'Abono transporte mensual',
    paymentMethod: 'Tarjeta de débito',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    date: new Date(Date.now() - 172800000).toISOString(), // 2 Days ago
    amount: 120.00,
    categoryId: 'c3', // Ocio
    type: 'variable',
    description: 'Entradas concierto',
    paymentMethod: 'Bizum',
    whoPaid: 'Jose',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const MOCK_CATEGORIES = [
  { id: 'c1', name: 'Comida', color: '#10B981', icon: 'Utensils' },
  { id: 'c2', name: 'Transporte', color: '#3B82F6', icon: 'Bus' },
  { id: 'c3', name: 'Ocio', color: '#8B5CF6', icon: 'Ticket' },
];
