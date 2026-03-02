import { SELECT_MODULE } from '../state/actions';
import { MODULE_INFO } from '../services/moduleService';
import ModuleCard from '../components/ModuleCard';
import BackButton from '../components/BackButton';
import LogoutButton from '../components/LogoutButton';

export default function ModulesPage({ dispatch, patientId }) {
  function handleSelect(moduleKey) {
    dispatch({ type: SELECT_MODULE, payload: { moduleKey } });
  }

  return (
    <div className="page">
      <header className="page-header">
        <BackButton dispatch={dispatch} />
        <h2>Módulos — Paciente #{patientId}</h2>
        <LogoutButton dispatch={dispatch} />
      </header>
      <div className="module-grid">
        {Object.entries(MODULE_INFO).map(([key, { label, color }]) => (
          <ModuleCard
            key={key}
            moduleKey={key}
            label={label}
            color={color}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
