// src/utilities/api-service.js
export async function getRecommendation(formData, token) {
  const res = await fetch('/api/ai/recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(formData)
  });
  if (!res.ok) throw new Error('Failed to get recommendation');
  return res.json();
}
