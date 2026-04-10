"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Department } from "@/data/departments";
import { formatMoney, formatPercentCompact } from "@/lib/format";

type DepartmentDetailProps = {
  department: Department;
  compact?: boolean;
  onBack?: () => void;
  backLabel?: string;
};

export function DepartmentDetail({
  department,
  compact = false,
  onBack,
  backLabel = "Back"
}: DepartmentDetailProps) {
  const shouldReduceMotion = useReducedMotion();
  const maxExpense = Math.max(
    ...department.expenses.map((expense) => expense.amount),
    1
  );

  return (
    <motion.section
      className="detailShell"
      style={{ ["--department-accent" as never]: `var(${department.accentVar})` }}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {!compact && onBack ? (
        <div className="sectionBackRow">
          <button type="button" className="backButton" onClick={onBack}>
            ← {backLabel}
          </button>
        </div>
      ) : null}

      <div className="detailHeader">
        <div className="detailHeaderCopy">
          <div className="detailAccent" />
          <h2 className="detailTitle">{department.name}</h2>
          <p className="detailDescription">{department.description}</p>
        </div>

        <div className="detailKpis" aria-label={`${department.name} summary metrics`}>
          <div className="detailKpi">
            <div className="detailKpiLabel">Budget</div>
            <div className="detailKpiValue">{formatMoney(department.budget)}</div>
          </div>
          <div className="detailKpi">
            <div className="detailKpiLabel">Spent</div>
            <div className="detailKpiValue">{formatMoney(department.spent)}</div>
          </div>
          <div className="detailKpi">
            <div className="detailKpiLabel">Balance</div>
            <div className="detailKpiValue success">
              {formatMoney(department.balance)}
            </div>
          </div>
          <div className="detailKpi">
            <div className="detailKpiLabel">Net Return</div>
            <div className="detailKpiValue accent">
              {formatPercentCompact(department.netReturn)}
            </div>
          </div>
        </div>
      </div>

      <div className="detailGrid">
        <section className="panel">
          <h3 className="panelTitle">Expense Breakdown</h3>

          <div className="breakdownList">
            {department.expenses.map((item) => {
              const width = Math.max((item.amount / maxExpense) * 100, item.amount > 0 ? 5 : 0);

              return (
                <div className="breakdownItem" key={item.label}>
                  <div className="breakdownRow">
                    <span className="breakdownName">{item.label}</span>
                    <span className="breakdownValue">{formatMoney(item.amount)}</span>
                  </div>
                  <div className="breakdownTrack" aria-hidden="true">
                    <div
                      className="breakdownFill"
                      style={{
                        inlineSize: `${width}%`,
                        background: `var(${department.accentVar})`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div style={{ display: "grid", gap: "16px" }}>
          <section className="panel">
            <h3 className="panelTitle">Key Insights</h3>
            <div className="noteList">
              {department.insights.map((item) => (
                <div className="noteItem" key={item}>
                  <span className="noteDot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel">
            <h3 className="panelTitle">Cost Control Recommendations</h3>
            <div className="noteList">
              {department.recommendations.map((item) => (
                <div className="noteItem" key={item}>
                  <span className="noteDot success" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="panel rationalePanel">
        <h3 className="panelTitle">Budget Rationale</h3>
        <p className="rationaleText">{department.rationale}</p>
      </section>
    </motion.section>
  );
}