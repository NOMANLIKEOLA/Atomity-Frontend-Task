"use client";

import type { Department } from "@/data/departments";
import { motion } from "framer-motion";
import { MetricStrip } from "./MetricStrip";
import { BarChart } from "./BarChart";

type AnalyticsViewProps = {
  departments: Department[];
  summary: {
    budget: number;
    spent: number;
    balance: number;
    weightedReturn: number;
  };
  mode: "budget" | "roi";
  onModeChange: (mode: "budget" | "roi") => void;
  onDepartmentSelect: (departmentId: string) => void;
  onBackToDashboard: () => void;
};

export function AnalyticsView({
  departments,
  summary,
  mode,
  onModeChange,
  onDepartmentSelect,
  onBackToDashboard
}: AnalyticsViewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="hero">
        <div className="heroAccent" />
        <h1 className="heroTitle">
          Financial <br />
          Analytics
        </h1>
        <div className="heroSub">VANDGROSS CONSTRUCTION CO. — COMPARATIVE ANALYSIS</div>
      </div>

      <MetricStrip
        budget={summary.budget}
        spent={summary.spent}
        balance={summary.balance}
        weightedReturn={summary.weightedReturn}
      />

      <div className="sectionBackRow chartBackRow">
        <button type="button" className="chartBackButton" onClick={onBackToDashboard}>
          ← Back to Dashboard
        </button>
        <span className="summaryNote">
          Click any bar or department label to open the detailed report.
        </span>
      </div>

      <div className="toolbar">
        <button
          type="button"
          className="modeButton"
          data-active={mode === "budget"}
          onClick={() => onModeChange("budget")}
        >
          Budget vs Spend
        </button>
        <button
          type="button"
          className="modeButton"
          data-active={mode === "roi"}
          onClick={() => onModeChange("roi")}
        >
          Net Return %
        </button>
      </div>

      <section className="chartShell">
        <div className="chartHeader">
          <h2 className="chartTitle">
            {mode === "budget"
              ? "Budget vs Actual Spend by Department"
              : "Net Return (%) by Department"}
          </h2>
        </div>

        <BarChart
          departments={departments}
          mode={mode}
          onDepartmentSelect={onDepartmentSelect}
        />

        <div className="chartLegend">
          {mode === "budget" ? (
            <>
              <span className="legendItem">
                <span
                  className="legendSwatch"
                  style={{ background: "var(--color-accent-primary)" }}
                />
                Budget Allocated
              </span>
              <span className="legendItem">
                <span
                  className="legendSwatch"
                  style={{
                    background:
                      "color-mix(in srgb, var(--color-accent-primary) 82%, var(--color-text-primary))"
                  }}
                />
                Actual Spent
              </span>
            </>
          ) : (
            <span className="legendItem">
              <span
                className="legendSwatch"
                style={{ background: "var(--color-accent-primary)" }}
              />
              Net Return
            </span>
          )}
        </div>
      </section>
    </motion.section>
  );
}