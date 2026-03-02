import { getPatients } from '../services/patientService';
import { SELECT_PATIENT } from '../state/actions';
import PatientCard from '../components/PatientCard';
import LogoutButton from '../components/LogoutButton';

export default function PatientSelectPage({ dispatch }) {
  const patients = getPatients();

  function handleSelect(patientId) {
    dispatch({ type: SELECT_PATIENT, payload: { patientId } });
  }

  return (
    <div className="page">
      <header className="page-header">
        <h2>Seleccionar Paciente</h2>
        <LogoutButton dispatch={dispatch} />
      </header>
      <div className="patient-grid">
        {patients.map((p) => (
          <PatientCard key={p.id} patient={p} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
