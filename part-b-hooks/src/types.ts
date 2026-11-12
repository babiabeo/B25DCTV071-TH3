export type ExpenseCategory = "Ăn uống" | "Đi lại" | "Học tập" | "Giải trí";
export type ExpenseFilter = ExpenseCategory | "Tất cả";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}

export const categories: ExpenseCategory[] = [
  "Ăn uống",
  "Đi lại",
  "Học tập",
  "Giải trí",
];
