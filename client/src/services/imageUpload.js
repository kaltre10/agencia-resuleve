const API_BASE = import.meta.env.VITE_API_URL || '';

export async function uploadImage(base64Data, description = '') {
  const url = API_BASE
    ? `${API_BASE}/upload/image`
    : '/api/upload/image';

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: base64Data, description }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
    throw new Error(err.error || `Error HTTP ${response.status}`);
  }

  return response.json();
}
