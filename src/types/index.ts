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
  date: string; // ISO string
  amount: number;
  categoryId: string;
  subCategoryId?: string;
  type: ExpenseType;
  description: string;
  paymentMethod: string;
  location?: string;
  knownPlace?: string;
  photoUrl?: string; // Phase 2: Supabase URL or local preview
  whoPaid?: string; // For shared expenses or multiple users
  createdAt: string;
  updatedAt: string;
}
