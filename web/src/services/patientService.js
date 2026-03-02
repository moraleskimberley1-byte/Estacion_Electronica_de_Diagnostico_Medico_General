const patients = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Paciente${String(i + 1).padStart(4, '0')}`,
}));

export function getPatients() {
  return patients;
}
