import type { Department } from "@/data/departments";
import { DepartmentCard } from "./DepartmentCard";

type DepartmentGridProps = {
  departments: Department[];
  onSelect: (departmentId: string) => void;
};

export function DepartmentGrid({ departments, onSelect }: DepartmentGridProps) {
  return (
    <section className="departmentGrid" aria-label="Department overview cards">
      {departments.map((department, index) => (
        <DepartmentCard
          key={department.id}
          department={department}
          index={index}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}