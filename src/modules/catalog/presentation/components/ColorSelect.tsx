import { Select } from "antd";

const mapCss = (c: string) => {
  const m: Record<string, string> = {
    azul: "blue",
    negro: "black",
    blanco: "white",
    rojo: "red",
    verde: "green",
    amarillo: "yellow",
    gris: "gray",
    naranja: "orange",
    morado: "purple",
    café: "brown",
  };
  return m[c.toLowerCase()] ?? c; // acepta #hex, rgb(...), etc.
};

const Dot = ({ color }: { color: string }) => {
  const css = mapCss(color);
  const light = ["white", "yellow", "orange"].includes(css.toLowerCase());
  return (
    <span
      style={{
        display: "inline-block",
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: css,
        marginRight: 8,
        border: `1px solid ${light ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.15)"}`,
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.02)",
      }}
    />
  );
};

export default function ColorSelect({
  label = "Color",
  colors,
  value,
  onChange,
  hidden,
}: {
  label?: string;
  colors: string[];
  value: string | null;
  onChange: (v: string | null) => void;
  hidden?: boolean;
}) {
  if (hidden) return null;

  const options = colors.map((c) => ({
    value: c,
    // 👇 el label se usa en el dropdown y (gracias a optionLabelProp) también arriba
    label: (
      <span className="inline-flex items-center">
        <Dot color={c} />
        <span style={{ textTransform: "capitalize" }}>{c}</span>
      </span>
    ),
  }));

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-[#11110f] min-w-16">{label}</span>
      <Select
        className="min-w-[220px]"
        placeholder="Selecciona color"
        value={value ?? undefined}
        onChange={(v) => onChange(v || null)}
        options={options}
        optionLabelProp="label"   // muestra el label (con punto) en el control
        allowClear
      />
    </div>
  );
}

