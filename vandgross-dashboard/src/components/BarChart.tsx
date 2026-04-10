"use client";

import type { Department } from "@/data/departments";
import { formatMoney, formatPercentCompact } from "@/lib/format";

type BarChartProps = {
  departments: Department[];
  mode: "budget" | "roi";
  onDepartmentSelect: (departmentId: string) => void;
};

function percentOf(value: number, maxValue: number) {
  if (maxValue <= 0) {
    return 0;
  }

  return Math.max((value / maxValue) * 100, value > 0 ? 5 : 0);
}

export function BarChart({
  departments,
  mode,
  onDepartmentSelect
}: BarChartProps) {
  const budgetMax = Math.max(...departments.map((department) => department.budget), 1);
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
                  gridTemplateColumns: singleMode ? "1fr" : "repeat(2, minmax(0, 1fr))"
                }}
              >
                {mode === "budget" ? (
                  <>
                    <button
                      type="button"
                      className="chartBarSlot"
                      onClick={() => onDepartmentSelect(department.id)}
                      aria-label={`${department.name} budget bar`}
                    >
                      <div className="chartValue">{formatMoney(department.budget)}</div>
                      <div className="chartBarFrame">
                        <div
                          className="chartBar"
                          style={{
                            blockSize: `${percentOf(department.budget, budgetMax)}%`,
                            background: `var(${department.accentVar})`
                          }}
                        />
                      </div>
                      <div className="chartBarCaption">Budget</div>
                    </button>

                    <button
                      type="button"
                      className="chartBarSlot"
                      onClick={() => onDepartmentSelect(department.id)}
                      aria-label={`${department.name} spent bar`}
                    >
                      <div className="chartValue">{formatMoney(department.spent)}</div>
                      <div className="chartBarFrame">
                        <div
                          className="chartBar"
                          style={{
                            blockSize: `${percentOf(department.spent, budgetMax)}%`,
                            background:
                              "color-mix(in srgb, var(--department-accent, var(--color-accent-primary)) 82%, var(--color-text-primary))"
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
                    aria-label={`${department.name} net return bar`}
                  >
                    <div className="chartValue">
                      {formatPercentCompact(department.netReturn)}
                    </div>
                    <div className="chartBarFrame">
                      <div
                        className="chartBar"
                        style={{
                          blockSize: `${percentOf(department.netReturn, returnMax)}%`,
                          background: `var(${department.accentVar})`
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
                style={{
                  color: `var(${department.accentVar})`
                }}
                onClick={() => onDepartmentSelect(department.id)}
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