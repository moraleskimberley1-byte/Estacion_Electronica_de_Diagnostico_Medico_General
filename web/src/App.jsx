import { useReducer } from 'react';
import { appReducer, initialState, SCREENS } from './state/appReducer';
import LoginPage from './pages/LoginPage';
import PatientSelectPage from './pages/PatientSelectPage';
import ModulesPage from './pages/ModulesPage';
import ModuleDetailPage from './pages/ModuleDetailPage';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  switch (state.screen) {
    case SCREENS.LOGIN:
      return <LoginPage dispatch={dispatch} error={state.error} />;

    case SCREENS.PATIENT_SELECT:
      return <PatientSelectPage dispatch={dispatch} />;

    case SCREENS.MODULES:
      return <ModulesPage dispatch={dispatch} patientId={state.selectedPatient} />;

    case SCREENS.MODULE_DETAIL:
      return (
        <ModuleDetailPage
          dispatch={dispatch}
          patientId={state.selectedPatient}
          moduleKey={state.selectedModule}
        />
      );

    default:
      return <LoginPage dispatch={dispatch} error={state.error} />;
  }
}
