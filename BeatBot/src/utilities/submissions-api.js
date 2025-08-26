// src/utilities/submissions-api.js
import sendRequest from './send-request';

const BASE_URL = '/api/submissions';

export function listSubmissions() {
  return sendRequest(BASE_URL, 'GET');
}

export function getSubmission(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'GET');
}

export function listResults(id) {
  return sendRequest(`${BASE_URL}/${id}/results`, 'GET');
}

// Optional CRUD if you want manual create/update/delete beyond AI flow
export function createSubmission(payload) {
  return sendRequest(BASE_URL, 'POST', payload);
}

export function updateSubmission(id, payload) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', payload);
}

export function deleteSubmission(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}