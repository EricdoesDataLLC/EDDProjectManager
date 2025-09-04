const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5174';
const USERNAME  = import.meta.env.VITE_USERNAME  || 'analyst';

export async function fetchProjects({ clientId, preparer, page, pageSize }) {
  const params = new URLSearchParams();
  if (clientId) params.set('clientId', clientId);
  if (preparer) params.set('preparer', preparer);
  if (page) params.set('page', page);
  if (pageSize) params.set('pageSize', pageSize);
  const res = await fetch(`${API_BASE}/api/projects?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to load projects');
  return res.json();
}

export async function bulkSave(edits) {
  const res = await fetch(`${API_BASE}/api/projects/bulk`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-user': USERNAME
    },
    body: JSON.stringify({ projects: edits })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Save failed');
  }
  return res.json();
}

export async function fetchActivity(projectId) {
  const url = projectId ? `${API_BASE}/api/activity?projectId=${projectId}` : `${API_BASE}/api/activity`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to load activity');
  return res.json();
}

function getToken() {
  return localStorage.getItem('token');
}

export async function fetchProjects(params) {
  const token = getToken();
  const res = await fetch(`${API_BASE}/api/projects?${new URLSearchParams(params)}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

// same for bulkSave, fetchActivity (add Authorization header)