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

export interface Place {
  id: string;
  name: string;
  address?: string;
}

export interface Expense {
  id: string;
  date: string; // ISO string (includes date and time)
  amount: number;
  categoryId: string;
  subCategoryId?: string;
  placeId?: string;
  type: ExpenseType;
  description?: string;
  whoPaid: string; // Who made the expense
  paymentMethod?: string;
  location?: string; // Physical location / coordinates
  knownPlace?: string; // Mantener para compatibilidad o texto libre
  createdAt: string;
  updatedAt: string;
}

export interface Income {
  id: string;
  amount: number;
  description: string;
  source: string;
  date: string;
}

export interface FixedExpense {
  id: string;
  amount: number;
  description: string;
  categoryId: string; // Associated primary category
  date: string;
}

export interface MonthlyPlan {
  month: number; // 0-11
  year: number;
  incomes: Income[];
  savingsGoal: number;
  fixedExpenses: FixedExpense[];
}
