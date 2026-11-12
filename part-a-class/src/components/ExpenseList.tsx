import React from "react";
import { categories, type Expense, type ExpenseFilter } from "./types";

interface ExpenseListProps {
  expenses: Expense[];
  selectedCategory: ExpenseFilter;
  search: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (category: ExpenseFilter) => void;
  onDelete: (id: number) => void;
}

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: number) => void;
}

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount,
  );

class ExpenseItem extends React.Component<ExpenseItemProps> {
  render(): React.ReactNode {
    const { expense, onDelete } = this.props;

    return (
      <article className="expense">
        <div>
          <strong>{expense.description}</strong>
          <p className="meta">
            {expense.category} ·{" "}
            {new Date(`${expense.date}T00:00:00`).toLocaleDateString("vi-VN")}
          </p>
        </div>
        <div className="expense-actions">
          <strong className="amount">{formatCurrency(expense.amount)}</strong>
          <button
            type="button"
            onClick={() => onDelete(expense.id)}
            className="delete-button"
          >
            Xóa
          </button>
        </div>
      </article>
    );
  }
}

class ExpenseList extends React.Component<ExpenseListProps> {
  render(): React.ReactNode {
    const {
      expenses,
      selectedCategory,
      search,
      onSearchChange,
      onFilterChange,
      onDelete,
    } = this.props;
    const normalizedSearch = search.trim().toLowerCase();
    const visibleExpenses = expenses.filter((expense) => {
      const matchesCategory =
        selectedCategory === "Tất cả" || expense.category === selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        expense.description.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
    const total = visibleExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    const filters: ExpenseFilter[] = ["Tất cả", ...categories];

    return (
      <section className="card">
        <div className="list-header">
          <h2 className="section-title">Danh sách khoản chi</h2>
          <div className="list-controls">
            <input
              className="search-input"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Tìm khoản chi..."
            />
            <select
              className="filters"
              value={selectedCategory}
              onChange={(event) =>
                onFilterChange(event.target.value as ExpenseFilter)
              }
            >
              {filters.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        {visibleExpenses.length === 0 ? (
          <p className="empty">Chưa có khoản chi nào trong loại này.</p>
        ) : (
          <div className="expense-list">
            {visibleExpenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
        <div className="total">
          <strong>
            Tổng tiền {selectedCategory !== "Tất cả" && `(${selectedCategory})`}
          </strong>
          <strong>{formatCurrency(total)}</strong>
        </div>
      </section>
    );
  }
}

export default ExpenseList;
