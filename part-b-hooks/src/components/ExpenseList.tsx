import { categories, type Expense, type ExpenseFilter } from "../types";

interface ExpenseListProps {
  expenses: Expense[];
  selectedCategory: ExpenseFilter;
  search: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (category: ExpenseFilter) => void;
  onDelete: (id: string) => Promise<void>;
  loading: boolean;
  error: string;
  total: number;
}

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);

function ExpenseList({
  expenses,
  selectedCategory,
  search,
  onSearchChange,
  onFilterChange,
  onDelete,
  loading,
  error,
  total,
}: ExpenseListProps) {
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
            onChange={(event) => onFilterChange(event.target.value as ExpenseFilter)}
          >
            {filters.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading && <p className="status">Đang tải dữ liệu...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && expenses.length === 0 ? (
        <p className="empty">Chưa có khoản chi phù hợp.</p>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <article key={expense.id} className="expense">
              <div>
                <strong>{expense.description}</strong>
                <p className="meta">{expense.category} · {new Date(`${expense.date}T00:00:00`).toLocaleDateString("vi-VN")}</p>
              </div>
              <div className="expense-actions">
                <strong className="amount">{formatCurrency(expense.amount)}</strong>
                <button type="button" onClick={() => void onDelete(expense.id)} className="delete-button">Xóa</button>
              </div>
            </article>
          ))}
        </div>
      )}
      <div className="total">
        <span>Tổng tiền</span>
        <strong>{formatCurrency(total)}</strong>
      </div>
    </section>
  );
}

export default ExpenseList;
