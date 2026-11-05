(() => {
  const api = window.CampusConnectApi;
  const app = document.querySelector('#app');
  const search = document.querySelector('#search-input');
  const state = { events: [], registrations: [], view: 'explore', filter: 'All', query: '' };
  const demoEvents = [
    { id: 'demo-1', title: 'Annual HackCampus 2025', description: 'Build, innovate, and ship something meaningful with your campus community.', date: '2025-10-24T09:00:00', venue: 'Turing Great Hall', category: 'Hackathon' },
    { id: 'demo-2', title: 'Design Futures: AI & Culture', description: 'A conversation about designing technology for people and communities.', date: '2025-10-28T14:00:00', venue: 'Innovation Lab', category: 'Talks' },
    { id: 'demo-3', title: 'Campus Open Mic Night', description: 'An evening of music, poetry, comedy, and good company.', date: '2025-11-02T18:30:00', venue: 'Student Commons', category: 'Social' }
  ];
  const pick = (obj, keys, fallback = '') => keys.map(k => obj?.[k]).find(v => v !== undefined && v !== null && v !== '') ?? fallback;
  const eventTitle = e => pick(e, ['title', 'name', 'event_name'], 'Untitled campus event');
  const eventDate = e => pick(e, ['date', 'start_date', 'event_date', 'starts_at'], '');
  const formatDate = value => { const d = new Date(value); return Number.isNaN(d.getTime()) ? 'Date TBA' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); };
  const formatTime = value => { const d = new Date(value); return Number.isNaN(d.getTime()) ? 'Time TBA' : d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }); };
  const showToast = message => { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2800); };
  const normalizeList = body => api.list(body, 'events');

  function renderExplore() {
    const categories = ['All', ...new Set(state.events.map(e => pick(e, ['category', 'type', 'event_type'], 'Other')).filter(Boolean))];
    const visible = state.events.filter(e => {
      const text = `${eventTitle(e)} ${pick(e, ['description', 'venue', 'location'], '')}`.toLowerCase();
      return (!state.query || text.includes(state.query.toLowerCase())) && (state.filter === 'All' || pick(e, ['category', 'type', 'event_type'], 'Other') === state.filter);
    });
    app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">Verified student vault</div><h1>Discover what’s happening</h1><p>Find your next idea, connection, or unforgettable campus moment.</p></div><button class="primary-button" id="host-event">＋ Host an event</button></div><div class="filters">${categories.map(c => `<button class="filter ${state.filter === c ? 'active' : ''}" data-filter="${c}">${c}</button>`).join('')}</div>${visible.length ? `<div class="event-grid">${visible.map(renderCard).join('')}</div>` : '<div class="empty">No events match your search. Try another category or keyword.</div>'}`;
    document.querySelectorAll('[data-filter]').forEach(button => button.onclick = () => { state.filter = button.dataset.filter; renderExplore(); });
    document.querySelectorAll('[data-register]').forEach(button => button.onclick = () => register(button.dataset.register));
    document.querySelector('#host-event').onclick = () => showToast('Organizer tools are ready for your next event.');
  }
  function renderCard(e) { const title = eventTitle(e); const d = eventDate(e); const category = pick(e, ['category', 'type', 'event_type'], 'Campus event'); return `<article class="event-card"><div class="event-art"><div class="date-badge"><small>${d ? new Date(d).toLocaleDateString(undefined, { month: 'short' }) : 'TBA'}</small>${d && !Number.isNaN(new Date(d).getTime()) ? new Date(d).getDate() : '—'}</div><span class="art-label">${category}</span></div><div class="event-body"><h3>${title}</h3><div class="meta"><span>◷</span>${formatDate(d)} · ${formatTime(d)}</div><div class="meta"><span>⌖</span>${pick(e, ['venue', 'location', 'address'], 'Campus location TBA')}</div><div class="event-footer"><span class="tag">${pick(e, ['organizer', 'club', 'host'], 'Campus Connect')}</span><button class="secondary-button" data-register="${pick(e, ['id', 'event_id'], '')}">Register</button></div></div></article>`; }
  async function register(id) { if (!id) return showToast('This demo event is not connected to registration yet.'); try { await api.createRegistration({ event_id: id }); showToast('Registration confirmed!'); await loadRegistrations(); } catch (error) { showToast(error.status === 401 ? 'Add your access token before registering.' : `Registration failed: ${error.message}`); } }
  async function loadRegistrations() { try { state.registrations = api.list(await api.getMyRegistrations(), 'registrations'); } catch { state.registrations = []; } }
  function renderRegistrations() { app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">Your verified passes</div><h1>My registrations</h1><p>Keep track of every event you’ve joined.</p></div></div>${state.registrations.length ? `<div class="table-card"><table class="data-table"><thead><tr><th>Event</th><th>Status</th><th>Registered</th></tr></thead><tbody>${state.registrations.map(r => `<tr><td><strong>${pick(r, ['event_title', 'title', 'event_name'], 'Campus event')}</strong></td><td><span class="tag">${pick(r, ['status'], 'Confirmed')}</span></td><td>${formatDate(pick(r, ['created_at', 'registered_at'], ''))}</td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">No registrations yet. Explore events and reserve your first pass.</div>'}`; }
  function renderOrganizer() { app.innerHTML = `<div class="page-heading"><div><div class="eyebrow">Organizer workspace</div><h1>Run better campus events</h1><p>Manage your event operations from one trusted hub.</p></div><button class="primary-button" id="new-event">＋ Create event</button></div><div class="event-grid"><div class="empty"><div class="eyebrow">Event overview</div><h3>Connect your organizer account</h3><p>Event creation and attendee management will appear here once organizer access is enabled.</p></div></div>`; document.querySelector('#new-event').onclick = () => showToast('Event creation is coming next.'); }
  async function load() { try { state.events = normalizeList(await api.getEvents()); if (!state.events.length) state.events = demoEvents; } catch { state.events = demoEvents; showToast('Live API unavailable — showing sample events.'); } renderExplore(); }
  document.querySelectorAll('[data-view]').forEach(button => button.onclick = async () => { document.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('active', b === button)); state.view = button.dataset.view; if (state.view === 'explore') renderExplore(); if (state.view === 'registrations') { await loadRegistrations(); renderRegistrations(); } if (state.view === 'organizer') renderOrganizer(); });
  search.addEventListener('input', e => { state.query = e.target.value; if (state.view === 'explore') renderExplore(); });
  load();
})();
