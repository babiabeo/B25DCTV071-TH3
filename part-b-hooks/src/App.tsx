import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Header from "./components/Header";
import { ThemeContext } from "./context/ThemeContext";
import { useDebounce } from "./hooks/useDebounce";
import { useFetch } from "./hooks/useFetch";
import type { Expense, ExpenseFilter } from "./types";

const API_URL = "https://6ad0352e03feaa52b21f1c14.mockapi.io/so_tay";

function App() {
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseFilter>("Tất cả");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const {
    data: expenses,
    loading,
    error,
    request,
    refetch,
  } = useFetch<Expense[]>(API_URL, []);
  const currentExpenses = useMemo(() => expenses, [expenses]);

  const visibleExpenses = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();
    return currentExpenses.filter((expense) => {
      const matchesCategory =
        selectedCategory === "Tất cả" || expense.category === selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        expense.description.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [currentExpenses, debouncedSearch, selectedCategory]);

  const total = useMemo(
    () => currentExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    [currentExpenses],
  );
  const visibleTotal = useMemo(
    () => visibleExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    [visibleExpenses],
  );

  useEffect(() => {
    document.title = `Sổ chi tiêu - ${new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(total)}`;
  }, [total]);

  const handleAddExpense = useCallback(
    async (expense: Expense): Promise<void> => {
      await request(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });
      await refetch();
    },
    [refetch, request],
  );

  const handleDelete = useCallback(
    async (id: string): Promise<void> => {
      if (!window.confirm("Bạn có chắc muốn xóa khoản chi này không?")) {
        return;
      }
      await request(`${API_URL}/${id}`, { method: "DELETE" });
      await refetch();
    },
    [refetch, request],
  );

  return (
    <main className={`page ${isDark ? "dark-theme" : ""}`}>
      <Header isDark={isDark} onToggleTheme={toggleTheme} />
      <ExpenseForm onAddExpense={handleAddExpense} disabled={loading} />
      <ExpenseList
        expenses={visibleExpenses}
        selectedCategory={selectedCategory}
        search={search}
        onSearchChange={setSearch}
        onFilterChange={setSelectedCategory}
        onDelete={handleDelete}
        loading={loading}
        error={error}
        total={visibleTotal}
      />
    </main>
  );
}

export default App;
