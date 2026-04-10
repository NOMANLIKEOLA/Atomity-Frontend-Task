"use client";

import { motion } from "framer-motion";
import { DarkModeToggle } from "./DarkModeToggle";

type HeaderProps = {
  activeView: "dashboard" | "analytics";
  onViewChange: (view: "dashboard" | "analytics") => void;
  isDark: boolean;
  onToggleDark: () => void;
};

export function Header({
  activeView,
  onViewChange,
  isDark,
  onToggleDark
}: HeaderProps) {
  return (
    <header className="topbar">
      <div className="topbarInner">
        <motion.div
          className="brand"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          V&amp;G<span> Construction</span>
        </motion.div>

        <nav className="navGroup" aria-label="Primary navigation">
          <button
            type="button"
            className="navButton"
            data-active={activeView === "dashboard"}
            aria-pressed={activeView === "dashboard"}
            onClick={() => onViewChange("dashboard")}
          >
            Dashboard
          </button>
          <button
            type="button"
            className="navButton"
            data-active={activeView === "analytics"}
            aria-pressed={activeView === "analytics"}
            onClick={() => onViewChange("analytics")}
          >
            Analytics
          </button>
          <DarkModeToggle isDark={isDark} onToggle={onToggleDark} />
        </nav>
      </div>
    </header>
  );
}