import { Segmented, Select } from "antd";
import type { SegmentedLabeledOption } from "antd/es/segmented";
import { useMemo } from "react";

type Mode = "select" | "segmented";

export function VariantPicker({
  label,
  placeholder = "Selecciona una opción",
  options,
  value,
  onChange,
  mode = "select",
  className,
  hidden,
}: {
  label: string;
  placeholder?: string;
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
  mode?: Mode;
  className?: string;
  hidden?: boolean;
}) {
  const id = useMemo(() => `picker-${label.toLowerCase().replace(/\s+/g, "-")}`, [label]);
  if (hidden) return null;

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <label htmlFor={id} className="text-sm font-medium text-[#11110f] min-w-16">
        {label}
      </label>

      {mode === "segmented" ? (
        <Segmented
          id={id}
          size="middle"
          options={options as unknown as SegmentedLabeledOption[]}
          value={value ?? undefined}
          onChange={(v) => onChange((v as string) || null)}
        />
      ) : (
        <Select
          id={id}
          className="min-w-[200px]"
          placeholder={placeholder}
          value={value ?? undefined}
          onChange={(v) => onChange(v || null)}
          options={options.map((o) => ({ value: o, label: o }))}
          allowClear
        />
      )}
    </div>
  );
}

export default VariantPicker;
