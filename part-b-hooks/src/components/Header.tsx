import { useClock } from "../hooks/useClock";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

function Header({ isDark, onToggleTheme }: HeaderProps) {
  const currentTime = useClock();

  return (
    <header className="app-header">
      <div>
        <h1 className="title">Sổ chi tiêu cá nhân</h1>
      </div>
      <div className="header-actions">
        <time className="clock" dateTime={currentTime.toISOString()}>
          {currentTime.toLocaleTimeString("vi-VN")}
        </time>
        <button type="button" className="theme-button" onClick={onToggleTheme}>
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default Header;
