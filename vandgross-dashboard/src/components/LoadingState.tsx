export function LoadingState() {
  return (
    <main className="loadingState">
      <div className="loadingCard">
        <div className="hero">
          <div className="heroAccent" />
          <div className="skeletonLine short" />
          <div className="skeletonLine long" />
        </div>

        <div className="loadingSkeletonGrid" aria-hidden="true">
          <div className="loadingSkeletonCell">
            <div className="skeletonLine short" />
            <div className="skeletonLine long" />
          </div>
          <div className="loadingSkeletonCell">
            <div className="skeletonLine short" />
            <div className="skeletonLine long" />
          </div>
          <div className="loadingSkeletonCell">
            <div className="skeletonLine short" />
            <div className="skeletonLine long" />
          </div>
          <div className="loadingSkeletonCell">
            <div className="skeletonLine short" />
            <div className="skeletonLine long" />
          </div>
        </div>

        <div className="toolbar" aria-hidden="true">
          <div className="skeletonBar w40" style={{ blockSize: "30px" }} />
          <div className="skeletonBar w40" style={{ blockSize: "30px" }} />
          <div className="skeletonBar w40" style={{ blockSize: "30px" }} />
        </div>

        <div className="skeletonCardGrid" aria-hidden="true">
          <div className="skeletonCard">
            <div className="skeletonBar w40" />
            <div className="skeletonBlock" />
            <div className="skeletonBlock" />
            <div className="skeletonBlock" />
            <div className="skeletonBar w80" />
          </div>
          <div className="skeletonCard">
            <div className="skeletonBar w40" />
            <div className="skeletonBlock" />
            <div className="skeletonBlock" />
            <div className="skeletonBlock" />
            <div className="skeletonBar w80" />
          </div>
          <div className="skeletonCard">
            <div className="skeletonBar w40" />
            <div className="skeletonBlock" />
            <div className="skeletonBlock" />
            <div className="skeletonBlock" />
            <div className="skeletonBar w80" />
          </div>
          <div className="skeletonCard">
            <div className="skeletonBar w40" />
            <div className="skeletonBlock" />
            <div className="skeletonBlock" />
            <div className="skeletonBlock" />
            <div className="skeletonBar w80" />
          </div>
        </div>
      </div>
    </main>
  );
}