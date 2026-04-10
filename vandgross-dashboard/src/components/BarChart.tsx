"use client";

import { useEffect, useState } from "react";
import type { Department } from "@/data/departments";
import { formatMoney, formatPercentCompact } from "@/lib/format";

type BarChartProps = {
  departments: Department[];
  mode: "budget" | "roi";
  onDepartmentSelect: (departmentId: string) => void;
};

function percentOf(value: number, maxValue: number): number {
  if (maxValue <= 0) return 0;
  return Math.max((value / maxValue) * 100, value > 0 ? 4 : 0);
}

export function BarChart({ departments, mode, onDepartmentSelect }: BarChartProps) {
  const [mounted, setMounted] = useState(false);

  // On first paint bars are at 0%, then rAF triggers the CSS transition to real height
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Collapse → re-expand when mode switches so bars re-animate
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(false);
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, [mode]);

  const budgetMax = Math.max(...departments.map((d) => d.budget), 1);
  const returnMax = 25;

  return (
    <div className="chartArea" aria-label="Department analytics chart">
      <div className="chartGrid">
        {departments.map((department) => {
          const singleMode = mode === "roi";

          return (
            <div className="chartGroup" key={department.id}>
              <div
                className="chartGroupBars"
                data-mode={mode}
                style={{
                  gridTemplateColumns: singleMode
                    ? "1fr"
                    : "repeat(2, minmax(0, 1fr))",
                }}
              >
                {mode === "budget" ? (
                  <>
                    <button
                      type="button"
                      className="chartBarSlot"
                      onClick={() => onDepartmentSelect(department.id)}
                      aria-label={`${department.name} — budget ${formatMoney(department.budget)}`}
                    >
                      <div className="chartValue">
                        {formatMoney(department.budget)}
                      </div>
                      <div className="chartBarFrame">
                        <div
                          className="chartBar"
                          style={{
                            blockSize: mounted
                              ? `${percentOf(department.budget, budgetMax)}%`
                              : "0%",
                            background: `var(${department.accentVar})`,
                            opacity: 0.45,
                          }}
                        />
                      </div>
                      <div className="chartBarCaption">Budget</div>
                    </button>

                    <button
                      type="button"
                      className="chartBarSlot"
                      onClick={() => onDepartmentSelect(department.id)}
                      aria-label={`${department.name} — spent ${formatMoney(department.spent)}`}
                    >
                      <div className="chartValue">
                        {formatMoney(department.spent)}
                      </div>
                      <div className="chartBarFrame">
                        <div
                          className="chartBar"
                          style={{
                            blockSize: mounted
                              ? `${percentOf(department.spent, budgetMax)}%`
                              : "0%",
                            background: `var(${department.accentVar})`,
                            opacity: 0.85,
                          }}
                        />
                      </div>
                      <div className="chartBarCaption">Spent</div>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="chartBarSlot"
                    onClick={() => onDepartmentSelect(department.id)}
                    aria-label={`${department.name} — net return ${formatPercentCompact(department.netReturn)}`}
                  >
                    <div className="chartValue">
                      {formatPercentCompact(department.netReturn)}
                    </div>
                    <div className="chartBarFrame">
                      <div
                        className="chartBar"
                        style={{
                          blockSize: mounted
                            ? `${percentOf(department.netReturn, returnMax)}%`
                            : "0%",
                          background: `var(${department.accentVar})`,
                        }}
                      />
                    </div>
                    <div className="chartBarCaption">Net Return</div>
                  </button>
                )}
              </div>

              <button
                type="button"
                className="chartGroupLabel"
                style={{ color: `var(${department.accentVar})` }}
                onClick={() => onDepartmentSelect(department.id)}
                aria-label={`View ${department.name} detail`}
              >
                {department.shortLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}