import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SELECT_PATIENT,
  SELECT_MODULE,
  GO_BACK,
  LOGOUT,
} from './actions';

export const SCREENS = {
  LOGIN: 'LOGIN',
  PATIENT_SELECT: 'PATIENT_SELECT',
  MODULES: 'MODULES',
  MODULE_DETAIL: 'MODULE_DETAIL',
};

export const initialState = {
  screen: SCREENS.LOGIN,
  user: null,
  selectedPatient: null,
  selectedModule: null,
  error: null,
};

export function appReducer(state, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        screen: SCREENS.PATIENT_SELECT,
        user: action.payload.user,
        error: null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        screen: SCREENS.LOGIN,
        error: action.payload.error,
      };

    case SELECT_PATIENT:
      return {
        ...state,
        screen: SCREENS.MODULES,
        selectedPatient: action.payload.patientId,
        error: null,
      };

    case SELECT_MODULE:
      return {
        ...state,
        screen: SCREENS.MODULE_DETAIL,
        selectedModule: action.payload.moduleKey,
        error: null,
      };

    case GO_BACK:
      if (state.screen === SCREENS.MODULE_DETAIL) {
        return { ...state, screen: SCREENS.MODULES, selectedModule: null };
      }
      if (state.screen === SCREENS.MODULES) {
        return { ...state, screen: SCREENS.PATIENT_SELECT, selectedPatient: null };
      }
      return state;

    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
}
