"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { dashboardData } from "@/data/departments";
import { useDepartments } from "@/hooks/useDepartments";
import { AnalyticsView } from "./Analyticsview";
import { DepartmentDetail } from "./DepartmentDetail";
import { DepartmentGrid } from "./DepartmentGrid";
import { ErrorState } from "./ErrorState";
import { Header } from "./Header";
import { LoadingState } from "./LoadingState";
import { MetricStrip } from "./MetricStrip";

type MainView = "dashboard" | "analytics" | "detail";
type DetailSource = "dashboard" | "analytics";
type AnalyticsMode = "budget" | "roi";

const THEME_STORAGE_KEY = "vandgross-theme";

export default function DashboardApp() {
  const { data, isLoading, isError, refetch } = useDepartments();

  const [view, setView] = useState<MainView>("dashboard");
  const [detailSource, setDetailSource] = useState<DetailSource>("dashboard");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(
    null
  );
  const [showAll, setShowAll] = useState(false);
  const [analyticsMode, setAnalyticsMode] = useState<AnalyticsMode>("budget");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTheme === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(true);
      return;
    }

    if (storedTheme === "light") {
      setIsDark(false);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const departments = data?.departments ?? dashboardData.departments;
  const summary = data?.summary ?? dashboardData.summary;

  const selectedDepartment = useMemo(
    () => departments.find((department) => department.id === selectedDepartmentId) ?? null,
    [departments, selectedDepartmentId]
  );

  const openDepartment = (departmentId: string, source: DetailSource) => {
    setSelectedDepartmentId(departmentId);
    setDetailSource(source);
    setView("detail");
  };

  const goDashboard = () => {
    setView("dashboard");
    setSelectedDepartmentId(null);
  };

  const goAnalytics = () => {
    setView("analytics");
    setSelectedDepartmentId(null);
  };

  const goBackFromDetail = () => {
    if (detailSource === "analytics") {
      setView("analytics");
    } else {
      setView("dashboard");
    }

    setSelectedDepartmentId(null);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="appShell">
      <Header
        activeView={view === "analytics" ? "analytics" : "dashboard"}
        onViewChange={(nextView) => {
          if (nextView === "dashboard") {
            goDashboard();
          } else {
            goAnalytics();
          }
        }}
        isDark={isDark}
        onToggleDark={() => setIsDark((current) => !current)}
      />

      <main className="page">
        <AnimatePresence mode="wait">
          {view === "dashboard" ? (
            <motion.section
              key="dashboard"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="hero">
                <div className="heroAccent" />
                <h1 className="heroTitle">
                  Budget Control <br />
                  Dashboard
                </h1>
                <div className="heroSub">VANDGROSS CONSTRUCTION CO. — BUDGET TRACKER</div>
              </div>

              <MetricStrip
                budget={summary.budget}
                spent={summary.spent}
                balance={summary.balance}
                weightedReturn={summary.weightedReturn}
              />

              <div className="toolbar">
                <button
                  type="button"
                  className="toggleButton"
                  data-active={showAll}
                  onClick={() => setShowAll((current) => !current)}
                >
                  {showAll ? "▼ Collapse All Departments" : "▶ Expand All Departments"}
                </button>
              </div>

              {!showAll ? (
                <DepartmentGrid
                  departments={departments}
                  onSelect={(departmentId) => openDepartment(departmentId, "dashboard")}
                />
              ) : (
                <section className="allDepartments" aria-label="All department reports">
                  {departments.map((department, index) => (
                    <motion.div
                      key={department.id}
                      className="expandedBlock"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                    >
                      <DepartmentDetail department={department} compact />
                    </motion.div>
                  ))}
                </section>
              )}
            </motion.section>
          ) : null}

          {view === "analytics" ? (
            <AnalyticsView
              key="analytics"
              departments={departments}
              summary={summary}
              mode={analyticsMode}
              onModeChange={setAnalyticsMode}
              onDepartmentSelect={(departmentId) =>
                openDepartment(departmentId, "analytics")
              }
              onBackToDashboard={goDashboard}
            />
          ) : null}

          {view === "detail" && selectedDepartment ? (
            <motion.section
              key="detail"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <DepartmentDetail
                department={selectedDepartment}
                onBack={goBackFromDetail}
                backLabel={detailSource === "analytics" ? "Back to Analytics" : "Back to Dashboard"}
              />
            </motion.section>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}