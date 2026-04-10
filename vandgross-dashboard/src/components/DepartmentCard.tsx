"use client";

import { motion, useReducedMotion } from "framer-motion";
import { formatMoney, formatPercentCompact } from "@/lib/format";
import type { Department } from "@/data/departments";

type DepartmentCardProps = {
  department: Department;
  index: number;
  onSelect: (departmentId: string) => void;
};

export function DepartmentCard({
  department,
  index,
  onSelect
}: DepartmentCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const utilisation = Math.round((department.spent / department.budget) * 100);

  return (
    <motion.article
      className="departmentCard"
      style={{ ["--department-accent" as never]: `var(${department.accentVar})` }}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      role="button"
      tabIndex={0}
      aria-label={`${department.name} department card`}
      onClick={() => onSelect(department.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(department.id);
        }
      }}
    >
      <div className="departmentCardTop">
        <h3 className="departmentName">{department.name}</h3>
        <span className="departmentBadge">
          {formatPercentCompact(department.netReturn)} ROI
        </span>
      </div>

      <div className="departmentMetrics">
        <div className="metricMini">
          <div className="metricMiniLabel">Budget</div>
          <div className="metricMiniValue">{formatMoney(department.budget)}</div>
        </div>
        <div className="metricMini">
          <div className="metricMiniLabel">Spent</div>
          <div className="metricMiniValue">{formatMoney(department.spent)}</div>
        </div>
        <div className="metricMini">
          <div className="metricMiniLabel">Balance</div>
          <div className="metricMiniValue success">
            {formatMoney(department.balance)}
          </div>
        </div>
        <div className="metricMini">
          <div className="metricMiniLabel">Net Return</div>
          <div className="metricMiniValue accent">
            {formatPercentCompact(department.netReturn)}
          </div>
        </div>
      </div>

      <div className="progressMeta">
        <span>Spend utilisation</span>
        <span>{utilisation}%</span>
      </div>
      <div className="progressTrack" aria-hidden="true">
        <div
          className="progressFill"
          style={{
            inlineSize: `${utilisation}%`,
            background: `var(${department.accentVar})`
          }}
        />
      </div>

      <div className="cardFooter">
        <span>{department.expenses.length} expense categories</span>
        <span className="footerAction">View details →</span>
      </div>
    </motion.article>
  );
}