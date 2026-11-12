import { useRef, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { categories, type Expense, type ExpenseCategory } from "../types";

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => Promise<void>;
  disabled: boolean;
}

interface FormState {
  description: string;
  amount: string;
  category: ExpenseCategory;
  date: string;
}

const getToday = (): string => new Date().toISOString().slice(0, 10);

function ExpenseForm({ onAddExpense, disabled }: ExpenseFormProps) {
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>({
    description: "",
    amount: "",
    category: "Ăn uống",
    date: getToday(),
  });
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const numericAmount = Number(form.amount);
    if (!form.description.trim()) {
      setError("Vui lòng nhập nội dung khoản chi.");
      return;
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Số tiền phải là một giá trị lớn hơn 0.");
      return;
    }
    if (!form.date) {
      setError("Vui lòng chọn ngày chi.");
      return;
    }

    try {
      await onAddExpense({
        id: crypto.randomUUID(),
        description: form.description.trim(),
        amount: numericAmount,
        category: form.category,
        date: form.date,
      });
      setForm({ description: "", amount: "", category: "Ăn uống", date: getToday() });
      descriptionRef.current?.focus();
    } catch {
      setError("Không thể thêm khoản chi. Vui lòng thử lại.");
    }
  };

  return (
    <section className="card">
      <div className="card-form">
        <h2 className="section-title">Thêm khoản chi</h2>
        <form onSubmit={handleSubmit} className="expense-form">
          <label className="field">
            Nội dung
            <input
              ref={descriptionRef}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ví dụ: Ăn trưa"
            />
          </label>
          <label className="field">
            Số tiền (VNĐ)
            <input
              name="amount"
              type="number"
              min="1"
              value={form.amount}
              onChange={handleChange}
              placeholder="0"
            />
          </label>
          <label className="field">
            Loại
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            Ngày chi
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="primary-button" disabled={disabled}>
            {disabled ? "Đang lưu..." : "+ Thêm khoản chi"}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </section>
  );
}

export default ExpenseForm;
