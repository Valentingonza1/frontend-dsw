export async function login(username, password) {
  const base = import.meta.env.VITE_API_BASE || 'http://localhost:3001/api';
  const r = await fetch(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const body = await r.json().catch(() => null);
  if (!r.ok) throw new Error(body?.error || 'Login falló');
  const { token } = body || {};
  if (!token) throw new Error('Login falló: sin token');
  localStorage.setItem('token', token);
  return token;
}

export function logout() {
  localStorage.removeItem('token');
}

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}
