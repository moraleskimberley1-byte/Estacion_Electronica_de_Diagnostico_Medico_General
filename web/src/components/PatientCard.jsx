export default function PatientCard({ patient, onSelect }) {
  return (
    <button className="patient-card" onClick={() => onSelect(patient.id)}>
      <span className="patient-id">#{patient.id}</span>
      <span className="patient-name">{patient.name}</span>
    </button>
  );
}
