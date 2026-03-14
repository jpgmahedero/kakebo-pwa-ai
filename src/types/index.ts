export type ExpenseType = 'fixed' | 'variable';

export interface Category {
  id: string;
  name: string;
  color?: string;
  icon?: string;
}

export interface SubCategory {
  id: string;
  categoryId: string;
  name: string;
}

export interface Expense {
  id: string;
  date: string; // ISO string (includes date and time)
  amount: number;
  categoryId: string;
  subCategoryId?: string;
  type: ExpenseType;
  description: string;
  paymentMethod?: string;
  location?: string; // Physical location / coordinates
  knownPlace?: string; // "Sitio" (e.g., Starbucks, Mercadona)
  whoPaid: string; // Who made the expense
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}
