import type { Dispatch, SetStateAction } from "react";
interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <header className="page-header">
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <span className="ai-badge">🤖 AI Powered</span>

      <h1>GrowEasy AI Importer</h1>

      <p>
        Upload a CSV file and let AI map it into CRM-ready data.
      </p>
    </header>
  );
}

export default Header;