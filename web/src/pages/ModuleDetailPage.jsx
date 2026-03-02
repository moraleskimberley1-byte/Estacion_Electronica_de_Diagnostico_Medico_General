import { useMemo } from 'react';
import { getModuleData, MODULE_INFO } from '../services/moduleService';
import BackButton from '../components/BackButton';
import LogoutButton from '../components/LogoutButton';

function EcgView({ data }) {
  // Chart area dimensions (inside the axes)
  const margin = { top: 20, right: 20, bottom: 50, left: 60 };
  const plotW = 740;
  const plotH = 260;
  const svgW = plotW + margin.left + margin.right;
  const svgH = plotH + margin.top + margin.bottom;

  const points = data.datos;
  const sampleRate = 100; // 100 Hz assumed
  const totalSeconds = points.length / sampleRate;

  // Y-axis range from data
  const maxVal = Math.max(...points);
  const minVal = Math.min(...points);
  const padding = (maxVal - minVal) * 0.1 || 0.2;
  const yMin = minVal - padding;
  const yMax = maxVal + padding;

  // Helpers to map data → SVG coordinates
  const xScale = (i) => margin.left + (i / (points.length - 1)) * plotW;
  const yScale = (v) => margin.top + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  // Build signal path
  const pathD = points
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${xScale(i).toFixed(1)},${yScale(v).toFixed(1)}`)
    .join(' ');

  // Grid lines
  const xTickCount = Math.min(Math.floor(totalSeconds), 10);
  const xTicks = Array.from({ length: xTickCount + 1 }, (_, i) =>
    parseFloat(((totalSeconds / xTickCount) * i).toFixed(1))
  );

  const yTickStep = 0.5;
  const yTicks = [];
  for (let v = Math.ceil(yMin / yTickStep) * yTickStep; v <= yMax; v += yTickStep) {
    yTicks.push(parseFloat(v.toFixed(2)));
  }

  return (
    <div className="ecg-chart">
      <svg viewBox={`0 0 ${svgW} ${svgH}`}>
        <defs>
          <clipPath id="plot-area">
            <rect x={margin.left} y={margin.top} width={plotW} height={plotH} />
          </clipPath>
        </defs>

        {/* Background */}
        <rect x={margin.left} y={margin.top} width={plotW} height={plotH} fill="#fefefe" />

        {/* Minor grid (fine squares) */}
        {xTicks.map((t) => {
          const x = margin.left + (t / totalSeconds) * plotW;
          // Add 4 minor lines between each major tick
          const minor = [];
          if (t < totalSeconds) {
            const step = (totalSeconds / xTickCount) / 5;
            for (let m = 1; m <= 4; m++) {
              const mx = margin.left + ((t + step * m) / totalSeconds) * plotW;
              minor.push(
                <line key={`xm-${t}-${m}`} x1={mx} y1={margin.top} x2={mx} y2={margin.top + plotH}
                  stroke="#f0d0d0" strokeWidth="0.5" />
              );
            }
          }
          return minor;
        })}
        {yTicks.map((v, i) => {
          if (i === 0) return null;
          const y = yScale(v);
          const prevY = yScale(yTicks[i - 1]);
          const minor = [];
          for (let m = 1; m <= 4; m++) {
            const my = prevY + ((y - prevY) / 5) * m;
            minor.push(
              <line key={`ym-${v}-${m}`} x1={margin.left} y1={my} x2={margin.left + plotW} y2={my}
                stroke="#f0d0d0" strokeWidth="0.5" />
            );
          }
          return minor;
        })}

        {/* Major grid */}
        {xTicks.map((t) => {
          const x = margin.left + (t / totalSeconds) * plotW;
          return (
            <line key={`xg-${t}`} x1={x} y1={margin.top} x2={x} y2={margin.top + plotH}
              stroke="#e0b0b0" strokeWidth="1" />
          );
        })}
        {yTicks.map((v) => {
          const y = yScale(v);
          return (
            <line key={`yg-${v}`} x1={margin.left} y1={y} x2={margin.left + plotW} y2={y}
              stroke="#e0b0b0" strokeWidth="1" />
          );
        })}

        {/* Plot border */}
        <rect x={margin.left} y={margin.top} width={plotW} height={plotH}
          fill="none" stroke="#999" strokeWidth="1" />

        {/* Signal */}
        <path d={pathD} fill="none" stroke="#8B3A9F" strokeWidth="1.8" clipPath="url(#plot-area)" />

        {/* X-axis labels */}
        {xTicks.map((t) => {
          const x = margin.left + (t / totalSeconds) * plotW;
          return (
            <text key={`xl-${t}`} x={x} y={margin.top + plotH + 18}
              textAnchor="middle" fontSize="11" fill="#555">
              {t}
            </text>
          );
        })}
        <text x={margin.left + plotW / 2} y={svgH - 5}
          textAnchor="middle" fontSize="13" fill="#444" fontWeight="600">
          Tiempo (s)
        </text>

        {/* Y-axis labels */}
        {yTicks.map((v) => {
          const y = yScale(v);
          return (
            <text key={`yl-${v}`} x={margin.left - 8} y={y + 4}
              textAnchor="end" fontSize="11" fill="#555">
              {v.toFixed(1)}
            </text>
          );
        })}
        <text x={15} y={margin.top + plotH / 2}
          textAnchor="middle" fontSize="13" fill="#444" fontWeight="600"
          transform={`rotate(-90, 15, ${margin.top + plotH / 2})`}>
          Voltaje (mV)
        </text>
      </svg>
      <div className="ecg-meta">
        <span>Fecha: {data.fecha}</span>
        <span>Muestras: {points.length} | Frecuencia: {sampleRate} Hz</span>
      </div>
    </div>
  );
}

function DataTable({ rows }) {
  return (
    <table className="data-table">
      <tbody>
        {rows.map(({ label, value }) => (
          <tr key={label}>
            <td className="data-label">{label}</td>
            <td className="data-value">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function renderModuleData(moduleKey, data) {
  switch (moduleKey) {
    case 'ecg':
      return <EcgView data={data} />;

    case 'glucosa':
      return (
        <DataTable
          rows={[
            { label: 'Glucosa', value: `${data.glucosa_mg_dl} ${data.unit}` },
            { label: 'Fecha', value: data.fecha },
          ]}
        />
      );

    case 'presion':
      return (
        <DataTable
          rows={[
            { label: 'Sistólica', value: `${data.sistolica} mmHg` },
            { label: 'Diastólica', value: `${data.diastolica} mmHg` },
            { label: 'Frecuencia cardíaca', value: `${data.frecuencia} bpm` },
            { label: 'Fecha', value: data.fecha },
          ]}
        />
      );

    case 'signos_vitales':
      return (
        <DataTable
          rows={[
            { label: 'Temperatura', value: `${data.temperatura} °C` },
            { label: 'Saturación O₂', value: `${data.saturacion_oxigeno}%` },
            { label: 'Fecha', value: data.fecha },
          ]}
        />
      );

    default:
      return <p>Módulo desconocido</p>;
  }
}

export default function ModuleDetailPage({ dispatch, patientId, moduleKey }) {
  const info = MODULE_INFO[moduleKey];
  const data = useMemo(
    () => getModuleData(patientId, moduleKey),
    [patientId, moduleKey]
  );

  return (
    <div className="page">
      <header className="page-header">
        <BackButton dispatch={dispatch} />
        <h2 style={{ color: info.color }}>{info.label}</h2>
        <LogoutButton dispatch={dispatch} />
      </header>
      <p className="detail-subtitle">Paciente #{patientId}</p>
      <div className="detail-content">{renderModuleData(moduleKey, data)}</div>
    </div>
  );
}
