import type { Expense, Category, SubCategory, Place } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-alim', name: 'Alimentación', color: '#10B981', icon: 'ShoppingBasket' },
  { id: 'cat-ocio', name: 'Ocio', color: '#F59E0B', icon: 'GlassWater' },
  { id: 'cat-trans', name: 'Transporte', color: '#6366F1', icon: 'Bus' },
];

export const MOCK_SUBCATEGORIES: SubCategory[] = [];

export const MOCK_PLACES: Place[] = [
  { id: 'p1', name: 'Condis' },
  { id: 'p2', name: 'Mercadona' },
  { id: 'p3', name: 'Carrefour' },
  { id: 'p4', name: 'TMB' },
];

export const MOCK_EXPENSES: Expense[] = [
  {
    id: 'e1',
    amount: 45.50,
    description: 'Compra semanal frutas y verdura',
    categoryId: 'cat-alim',
    placeId: 'p2',
    date: '2026-01-15T18:30:00.000Z',
    type: 'variable',
    whoPaid: 'Jose',
    createdAt: '2026-01-15T18:30:00.000Z',
    updatedAt: '2026-01-15T18:30:00.000Z',
    paymentMethod: 'Tarjeta'
  },
  {
    id: 'e2',
    amount: 15.20,
    description: 'Cine con palomitas',
    categoryId: 'cat-ocio',
    date: '2026-02-10T20:15:00.000Z',
    type: 'variable',
    whoPaid: 'Jose',
    createdAt: '2026-02-10T20:15:00.000Z',
    updatedAt: '2026-02-10T20:15:00.000Z',
    paymentMethod: 'Tarjeta'
  },
  {
    id: 'e3',
    amount: 40.00,
    description: 'Recarga abono transporte TMB',
    categoryId: 'cat-trans',
    placeId: 'p4',
    date: '2026-03-01T09:00:00.000Z',
    type: 'fixed',
    whoPaid: 'Jose',
    createdAt: '2026-03-01T09:00:00.000Z',
    updatedAt: '2026-03-01T09:00:00.000Z',
    paymentMethod: 'Tarjeta'
  },
  {
    id: 'e4',
    amount: 12.80,
    description: 'Cenas Condis',
    categoryId: 'cat-alim',
    placeId: 'p1',
    date: '2026-04-12T21:10:00.000Z',
    type: 'variable',
    whoPaid: 'Jose',
    createdAt: '2026-04-12T21:10:00.000Z',
    updatedAt: '2026-04-12T21:10:00.000Z',
    paymentMethod: 'Tarjeta'
  },
  {
    id: 'e5',
    amount: 65.00,
    description: 'Cena restaurante aniversario',
    categoryId: 'cat-ocio',
    date: '2026-05-20T21:30:00.000Z',
    type: 'variable',
    whoPaid: 'Jose',
    createdAt: '2026-05-20T21:30:00.000Z',
    updatedAt: '2026-05-20T21:30:00.000Z',
    paymentMethod: 'Tarjeta'
  },
  {
    id: 'e6',
    amount: 22.30,
    description: 'Compra Mercadona',
    categoryId: 'cat-alim',
    placeId: 'p2',
    date: '2026-06-05T17:45:00.000Z',
    type: 'variable',
    whoPaid: 'Jose',
    createdAt: '2026-06-05T17:45:00.000Z',
    updatedAt: '2026-06-05T17:45:00.000Z',
    paymentMethod: 'Tarjeta'
  },
  {
    id: 'e7',
    amount: 5.50,
    description: 'Billete sencillo tren',
    categoryId: 'cat-trans',
    date: '2026-07-14T12:20:00.000Z',
    type: 'variable',
    whoPaid: 'Jose',
    createdAt: '2026-07-14T12:20:00.000Z',
    updatedAt: '2026-07-14T12:20:00.000Z',
    paymentMethod: 'Efectivo'
  },
  {
    id: 'e8',
    amount: 30.00,
    description: 'Entradas concierto',
    categoryId: 'cat-ocio',
    date: '2026-08-02T10:00:00.000Z',
    type: 'variable',
    whoPaid: 'Jose',
    createdAt: '2026-08-02T10:00:00.000Z',
    updatedAt: '2026-08-02T10:00:00.000Z',
    paymentMethod: 'Tarjeta'
  },
  {
    id: 'e9',
    amount: 55.20,
    description: 'Compra mensual Carrefour',
    categoryId: 'cat-alim',
    placeId: 'p3',
    date: '2026-09-18T19:00:00.000Z',
    type: 'variable',
    whoPaid: 'Jose',
    createdAt: '2026-09-18T19:00:00.000Z',
    updatedAt: '2026-09-18T19:00:00.000Z',
    paymentMethod: 'Tarjeta'
  },
  {
    id: 'e10',
    amount: 15.00,
    description: 'Cañas con amigos',
    categoryId: 'cat-ocio',
    date: '2026-10-31T23:30:00.000Z',
    type: 'variable',
    whoPaid: 'Jose',
    createdAt: '2026-10-31T23:30:00.000Z',
    updatedAt: '2026-10-31T23:30:00.000Z',
    paymentMethod: 'Efectivo'
  },
  {
    id: 'e11',
    amount: 40.00,
    description: 'Abono noviembre TMB',
    categoryId: 'cat-trans',
    placeId: 'p4',
    date: '2026-11-01T08:30:00.000Z',
    type: 'fixed',
    whoPaid: 'Jose',
    createdAt: '2026-11-01T08:30:00.000Z',
    updatedAt: '2026-11-01T08:30:00.000Z',
    paymentMethod: 'Tarjeta'
  },
  {
    id: 'e12',
    amount: 85.40,
    description: 'Cena Navidad familia',
    categoryId: 'cat-ocio',
    date: '2026-12-24T21:00:00.000Z',
    type: 'variable',
    whoPaid: 'Jose',
    createdAt: '2026-12-24T21:00:00.000Z',
    updatedAt: '2026-12-24T21:00:00.000Z',
    paymentMethod: 'Tarjeta'
  },
];
