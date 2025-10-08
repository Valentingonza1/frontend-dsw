// src/services/api.js
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001/api';

export async function api(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && options.body) headers.set('Content-Type', 'application/json');
  const token = localStorage.getItem('token');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const json = res.headers.get('content-type')?.includes('application/json') ? await res.json().catch(()=>null) : null;
  if (!res.ok) throw { status: res.status, data: json };
  return json;
}
