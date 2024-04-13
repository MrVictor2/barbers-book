import sendRequest from './send-request';

const BASE_URL = '/api/users';

export async function signUp(userData) {
  const token = await sendRequest(`${BASE_URL}/signup`, 'POST', userData);
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(credentials) {
  const token = await sendRequest(`${BASE_URL}/login`, 'POST', credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export async function getUserById(userId) {
  try {
    const user = await sendRequest(`${BASE_URL}/${userId}`);
    return user;
  } catch (error) {
    throw new Error('Error fetching user by ID');
  }
}