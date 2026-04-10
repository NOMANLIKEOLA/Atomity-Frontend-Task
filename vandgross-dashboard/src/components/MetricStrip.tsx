import { formatMoney, formatPercent } from "@/lib/format";

type MetricStripProps = {
  budget: number;
  spent: number;
  balance: number;
  weightedReturn: number;
};

export function MetricStrip({
  budget,
  spent,
  balance,
  weightedReturn
}: MetricStripProps) {
  return (
    <section className="metricStrip" aria-label="Consolidated totals">
      <div className="metricCard">
        <div className="metricLabel">Total Budget</div>
        <div className="metricValue">{formatMoney(budget)}</div>
      </div>
      <div className="metricCard">
        <div className="metricLabel">Total Spent</div>
        <div className="metricValue">{formatMoney(spent)}</div>
      </div>
      <div className="metricCard">
        <div className="metricLabel">Total Balance</div>
        <div className="metricValue success">{formatMoney(balance)}</div>
      </div>
      <div className="metricCard">
        <div className="metricLabel">Weighted Net Return</div>
        <div className="metricValue accent">{formatPercent(weightedReturn, 1)}</div>
      </div>
    </section>
  );
}