// src/utilities/users-service.js
import * as usersAPI from './users-api';

export async function signUp(userData) {
 // Call API but DO NOT store token (require manual login)
await usersAPI.signUp(userData);
// Ensure there is no token left around (older builds may have stored it)
localStorage.removeItem('token');
// Return a simple flag; caller doesn't need user yet
return { ok: true };
}



export async function login(credentials) {
  const response = await usersAPI.login(credentials);
  localStorage.setItem('token', response.token);
  return response.user;
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      return null;
    }
    return token;
  } catch {
    localStorage.removeItem('token');
    return null;
  }
}

export function getUser() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Support both payload shapes:
    // 1) { user: {...} }
    if (payload.user) return payload.user;
    // 2) minimal: { sub, email, name }
    return { _id: payload.sub, email: payload.email, name: payload.name };
  } catch {
    localStorage.removeItem('token');
    return null;
  }
}

export function logOut() {
  localStorage.removeItem('token');
}