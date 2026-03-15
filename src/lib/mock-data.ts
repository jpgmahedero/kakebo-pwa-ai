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

export const MOCK_EXPENSES: Expense[] = [];
