// src/utilities/send-request.js
import { getToken, logOut } from './users-service';

const API_BASE = import.meta.env.VITE_API_URL || '';

export default async function sendRequest(path, method = 'GET', payload = null) {
  const url = `${API_BASE}${path}`;
  const options = { method, headers: {} };

  if (payload) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }

  const token = getToken();
  if (token) options.headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, options);

  if (res.status === 401) { logOut(); throw new Error('Unauthorized'); }

  if (!res.ok) {
    try {
      const body = await res.json();
      throw new Error(body.message || body.error || 'Bad Request');
    } catch {
      const text = await res.text().catch(() => '');
      throw new Error(text || 'Bad Request');
    }
  }

  if (res.status === 204) return null;
  return res.json();
}