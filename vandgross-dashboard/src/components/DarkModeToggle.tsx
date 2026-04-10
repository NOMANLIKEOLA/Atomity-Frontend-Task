"use client";

type DarkModeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
};

export function DarkModeToggle({ isDark, onToggle }: DarkModeToggleProps) {
  return (
    <button
      type="button"
      className="iconButton"
      onClick={onToggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      data-dark={isDark ? "true" : "false"}
    >
      {isDark ? "☀" : "🌙"}
    </button>
  );
}