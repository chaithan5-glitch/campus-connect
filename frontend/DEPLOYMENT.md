# Deployment

## Render backend

Create/sync the Render Web Service from the root `render.yaml`. It configures `my-app` as the service root, uses Gunicorn, and checks `/health`. Set these environment variables in Render:

```text
SUPABASE_URL=...
SUPABASE_KEY=...
FRONTEND_ORIGIN=https://your-frontend.vercel.app
```

The backend listens on Render's `PORT` and exposes `/health`-style API traffic through the Flask app routes. The event API proxy prevents browser CORS issues with the upstream service.

## Vercel frontend

Deploy the `frontend` folder as the Vercel project root. The API client is configured for `https://campus-connect-api.onrender.com`. If your Render service URL changes, update `api-client.js` or set `window.CAMPUS_CONNECT_API_BASE_URL` before the API client loads.

The included `vercel.json` sends direct navigation and refreshes back to `index.html`.
