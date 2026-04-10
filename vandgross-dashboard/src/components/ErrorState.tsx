type ErrorStateProps = {
  onRetry: () => void;
};

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <main className="errorState">
      <div className="errorStateCard">
        <h1 className="errorTitle">Unable to load dashboard data</h1>
        <p className="errorText">
          The remote seed fetch did not complete, so the dashboard cannot finish
          initialising.
        </p>
        <button type="button" className="retryButton" onClick={onRetry}>
          Retry
        </button>
      </div>
    </main>
  );
}