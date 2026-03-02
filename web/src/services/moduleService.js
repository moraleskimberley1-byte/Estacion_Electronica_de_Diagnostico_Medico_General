function generateEcgSignal() {
  const points = [];
  for (let i = 0; i < 500; i++) {
    const t = i / 100;
    const pWave = 0.2 * Math.exp(-Math.pow(t % 1 - 0.15, 2) / 0.002);
    const qrs =
      -0.1 * Math.exp(-Math.pow(t % 1 - 0.35, 2) / 0.0005) +
      1.2 * Math.exp(-Math.pow(t % 1 - 0.4, 2) / 0.0008) +
      -0.15 * Math.exp(-Math.pow(t % 1 - 0.45, 2) / 0.0005);
    const tWave = 0.3 * Math.exp(-Math.pow(t % 1 - 0.65, 2) / 0.005);
    const noise = (Math.random() - 0.5) * 0.03;
    points.push(parseFloat((pWave + qrs + tWave + noise).toFixed(3)));
  }
  return points;
}

const mockData = {
  ecg: (patientId) => ({
    id_usuario: patientId,
    datos: generateEcgSignal(),
    fecha: '2026-02-21 10:35:00',
    unit: 'mV',
  }),

  glucosa: (patientId) => ({
    id_usuario: patientId,
    glucosa_mg_dl: 80 + Math.floor(Math.random() * 40),
    fecha: '2026-02-21 10:35:00',
    unit: 'mg/dL',
  }),

  presion: (patientId) => ({
    id_usuario: patientId,
    sistolica: 110 + Math.floor(Math.random() * 30),
    diastolica: 70 + Math.floor(Math.random() * 20),
    frecuencia: 60 + Math.floor(Math.random() * 30),
    fecha: '2026-02-21 10:35:00',
  }),

  signos_vitales: (patientId) => ({
    id_usuario: patientId,
    temperatura: parseFloat((36.0 + Math.random() * 1.5).toFixed(2)),
    saturacion_oxigeno: 95 + Math.floor(Math.random() * 5),
    fecha: '2026-02-21 10:35:00',
  }),
};

export const MODULE_INFO = {
  ecg: { label: 'Electrocardiograma', color: '#C3A6D8' },
  glucosa: { label: 'Glucosa', color: '#F2A7B3' },
  presion: { label: 'Presión Arterial', color: '#7ED4C8' },
  signos_vitales: { label: 'Temperatura / SpO2', color: '#C5E17A' },
};

export function getModuleData(patientId, moduleKey) {
  const generator = mockData[moduleKey];
  if (!generator) return null;
  return generator(patientId);
}
