const API = "/api";

async function json(res) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Request failed");
  return data;
}

export const fetchPostes = () => fetch(`${API}/postes`).then(json);
export const fetchPosteDetail = (id) => fetch(`${API}/postes/${id}`).then(json);
export const fetchAlerts = () => fetch(`${API}/maintenance/alerts`).then(json);

export async function createPoste(name, files) {
  const form = new FormData();
  form.append("name", name);
  for (const f of files) form.append("files", f);
  return json(await fetch(`${API}/postes`, { method: "POST", body: form }));
}

export async function deletePoste(id) {
  return json(await fetch(`${API}/postes/${id}`, { method: "DELETE" }));
}

export async function appendFiles(id, files) {
  const form = new FormData();
  for (const f of files) form.append("files", f);
  return json(await fetch(`${API}/postes/${id}/append`, { method: "POST", body: form }));
}

export const togglePause = (id) =>
  fetch(`${API}/postes/${id}/toggle`, { method: "POST" }).then(json);

export const restart = (id) =>
  fetch(`${API}/postes/${id}/restart`, { method: "POST" }).then(json);

export async function updateSettings(id, settings) {
  return json(await fetch(`${API}/postes/${id}/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  }));
}

export async function jumpPoste(id, target, finish = false) {
  return json(await fetch(`${API}/postes/${id}/jump`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(finish ? { finish: true } : { target }),
  }));
}

export async function jumpAll(target) {
  return json(await fetch(`${API}/postes/jump-all`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ target }),
  }));
}

export const tickAll = () =>
  fetch(`${API}/tick`, { method: "POST" }).then(json);

export async function updateFilter(id, start, end) {
  return json(await fetch(`${API}/postes/${id}/filter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ start, end }),
  }));
}

export function exportHistoryUrl(id, start, end) {
  return `${API}/postes/${id}/export?start=${start}&end=${end}`;
}

export async function login(email, password) {
  return json(await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }));
}

export async function logout(email) {
  return json(await fetch(`${API}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }));
}

export async function register(email, password) {
  return json(await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }));
}

export async function forgotPassword(email) {
  return json(await fetch(`${API}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  }));
}

export async function claimAlert(alertId, userEmail) {
  return json(await fetch(`${API}/maintenance/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alert_id: alertId, user_email: userEmail }),
  }));
}

export async function fixAlert(alertId, userEmail) {
  return json(await fetch(`${API}/maintenance/fix`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alert_id: alertId, user_email: userEmail }),
  }));
}
