# Deployment

## Render backend

Create a Render Web Service with `my-app` as the root directory. Use the included `requirements.txt`, `Procfile`, or `render.yaml`. Set these environment variables in Render:

```text
SUPABASE_URL=...
SUPABASE_KEY=...
FRONTEND_ORIGIN=https://your-frontend.vercel.app
```

The backend listens on Render's `PORT` and exposes `/health`-style API traffic through the Flask app routes. The event API proxy prevents browser CORS issues with the upstream service.

## Vercel frontend

Deploy the `frontend` folder as the Vercel project root. Before deploying, replace `https://your-campus-connect-api.onrender.com` in `api-client.js` with the final Render service URL, or set `window.CAMPUS_CONNECT_API_BASE_URL` before the API client loads.

The included `vercel.json` sends direct navigation and refreshes back to `index.html`.
