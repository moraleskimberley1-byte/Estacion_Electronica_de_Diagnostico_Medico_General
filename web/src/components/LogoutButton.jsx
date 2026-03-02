import { LOGOUT } from '../state/actions';

export default function LogoutButton({ dispatch }) {
  return (
    <button
      className="logout-btn"
      onClick={() => dispatch({ type: LOGOUT })}
    >
      Cerrar sesión
    </button>
  );
}
