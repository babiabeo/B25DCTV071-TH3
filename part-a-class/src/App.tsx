import React from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Header from "./components/Header";
import type { Expense, ExpenseFilter } from "./components/types";

interface AppState {
  expenses: Expense[];
  selectedCategory: ExpenseFilter;
  search: string;
}

const sampleExpenses: Expense[] = [
  { id: 1, description: "Ăn sáng", amount: 35000, category: "Ăn uống", date: "2026-11-12" },
  { id: 2, description: "Xe buýt đến trường", amount: 15000, category: "Đi lại", date: "2026-11-12" },
  { id: 3, description: "Mua giáo trình", amount: 120000, category: "Học tập", date: "2026-11-11" },
  { id: 4, description: "Xem phim cuối tuần", amount: 90000, category: "Giải trí", date: "2026-11-09" },
];

class App extends React.Component<Record<string, never>, AppState> {
  state: AppState = {
    expenses: sampleExpenses,
    selectedCategory: "Tất cả",
    search: "",
  };

  componentDidUpdate(): void {
    const total = this.state.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.title = `Sổ chi tiêu - ${new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(total)}`;
  }

  private handleAddExpense = (expense: Expense): void => {
    this.setState((state) => ({ expenses: [expense, ...state.expenses] }));
  };

  private handleDelete = (id: number): void => {
    if (!window.confirm("Bạn có chắc muốn xóa khoản chi này không?")) {
      return;
    }
    this.setState((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    }));
  };

  render(): React.ReactNode {
    const { expenses, selectedCategory } = this.state;

    return (
      <main className="page">
        <Header />
        <ExpenseForm onAddExpense={this.handleAddExpense} />
        <ExpenseList
          expenses={expenses}
          selectedCategory={selectedCategory}
          search={this.state.search}
          onSearchChange={(search) => this.setState({ search })}
          onFilterChange={(category) => this.setState({ selectedCategory: category })}
          onDelete={this.handleDelete}
        />
      </main>
    );
  }
}

export default App;
