(function () {
  const API_BASE_URL = window.CAMPUS_CONNECT_API_BASE_URL ||
    (window.location.port === '5000' ? '' : 'https://campus-connect-cegp.onrender.com');

  function getToken() {
    return localStorage.getItem('campus_connect_token') ||
      localStorage.getItem('access_token') ||
      localStorage.getItem('token');
  }

  async function request(path, options) {
    const token = getToken();
    const headers = new Headers(options && options.headers);
    headers.set('Accept', 'application/json');
    if (options && options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    const response = await fetch(`${API_BASE_URL}${path}`, { credentials: 'omit', ...options, headers });
    const contentType = response.headers.get('content-type') || '';
    const body = contentType.includes('json') ? await response.json() : await response.text();
    if (!response.ok) {
      const message = typeof body === 'object' && body !== null ? body.detail || body.message || body.error : body;
      const error = new Error(message || `Request failed (${response.status})`);
      error.status = response.status;
      error.body = body;
      throw error;
    }
    return body;
  }

  function list(body, key) {
    if (Array.isArray(body)) return body;
    if (body && Array.isArray(body[key])) return body[key];
    if (body && Array.isArray(body.data)) return body.data;
    return [];
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  }

  window.CampusConnectApi = {
    baseUrl: API_BASE_URL,
    request,
    getEvents: () => request('/api/events'),
    getEvent: async id => {
      const body = await request(`/api/events/${encodeURIComponent(id)}`);
      return body && body.data && !Array.isArray(body.data) ? body.data : body;
    },
    createRegistration: payload => request('/api/registrations', { method: 'POST', body: JSON.stringify(payload) }),
    getMyRegistrations: () => request('/api/me/registrations'),
    getEventRegistrations: id => request(`/api/events/${encodeURIComponent(id)}/registrations`),
    login: payload => request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
    list,
    escapeHtml
  };
})();
