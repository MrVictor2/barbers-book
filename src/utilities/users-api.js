import sendRequest from './send-request';
const BASE_URL = '/api/users';

// Refactored code below
export async function signUp(userData) {
  try {
    // Send a POST request to the /signup endpoint with the user data
    const token = await sendRequest(`${BASE_URL}/signup`, 'POST', userData);
    // Optionally, you can handle the token here if needed
    return token;
  } catch (error) {
    // Handle any errors that occur during the sign-up process
    console.error('Error signing up:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}