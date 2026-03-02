import { useState } from 'react';
import { login } from '../services/authService';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../state/actions';

export default function LoginPage({ dispatch, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      dispatch({ type: LOGIN_SUCCESS, payload: { user: result.user } });
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: { error: result.error } });
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Estación de Diagnóstico Médico</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-msg">{error}</p>}
        <button type="submit" className="login-btn">Ingresar</button>
      </form>
    </div>
  );
}
