export default function ModuleCard({ moduleKey, label, color, onSelect }) {
  return (
    <button
      className="module-card"
      style={{ backgroundColor: color }}
      onClick={() => onSelect(moduleKey)}
    >
      {label}
    </button>
  );
}
