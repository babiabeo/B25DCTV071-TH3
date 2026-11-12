import React from "react";
import { categories, type Expense, type ExpenseCategory } from "./types";

interface FormState {
  description: string;
  amount: string;
  category: ExpenseCategory;
  date: string;
  error: string;
}

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

const getToday = (): string => new Date().toISOString().slice(0, 10);

class ExpenseForm extends React.Component<ExpenseFormProps, FormState> {
  state: FormState = {
    description: "",
    amount: "",
    category: "Ăn uống",
    date: getToday(),
    error: "",
  };

  private handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = event.target;
    this.setState((state) => ({
      ...state,
      [name]: value,
      error: "",
    }));
  };

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { description, amount, category, date } = this.state;
    const numericAmount = Number(amount);

    if (!description.trim()) {
      this.setState({ error: "Vui lòng nhập nội dung khoản chi." });
      return;
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      this.setState({ error: "Số tiền phải là một giá trị lớn hơn 0." });
      return;
    }
    if (!date) {
      this.setState({ error: "Vui lòng chọn ngày chi." });
      return;
    }

    this.props.onAddExpense({
      id: Date.now(),
      description: description.trim(),
      amount: numericAmount,
      category,
      date,
    });
    this.setState({
      description: "",
      amount: "",
      category: "Ăn uống",
      date: getToday(),
      error: "",
    });
  };

  render(): React.ReactNode {
    const { description, amount, category, date, error } = this.state;

    return (
      <section className="card">
        <div className="card-form">
          <h2 className="section-title">Thêm khoản chi</h2>
          <form onSubmit={this.handleSubmit} className="expense-form">
            <label className="field">
              Nội dung
              <input
                name="description"
                value={description}
                onChange={this.handleChange}
                placeholder="Ví dụ: Ăn trưa"
              />
            </label>
            <label className="field">
              Số tiền (VNĐ)
              <input
                name="amount"
                type="number"
                min="1"
                value={amount}
                onChange={this.handleChange}
                placeholder="0"
              />
            </label>
            <label className="field">
              Loại
              <select
                name="category"
                value={category}
                onChange={this.handleChange}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              Ngày chi
              <input
                name="date"
                type="date"
                value={date}
                onChange={this.handleChange}
              />
            </label>
            <button type="submit" className="primary-button">
              + Thêm khoản chi
            </button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </section>
    );
  }
}

export default ExpenseForm;
