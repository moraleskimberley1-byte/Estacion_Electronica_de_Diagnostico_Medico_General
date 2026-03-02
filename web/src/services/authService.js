const VALID_USER = { username: 'admin', password: 'password' };

export function login(username, password) {
  if (username === VALID_USER.username && password === VALID_USER.password) {
    return { success: true, user: { username } };
  }
  return { success: false, error: 'Usuario o contraseña incorrectos' };
}
