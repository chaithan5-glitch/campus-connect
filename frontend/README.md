# CampusConnect frontend

This is a dependency-free responsive frontend for the CampusConnect API. Deploy this folder to Vercel or open `index.html` through a local static server.

From the repository root, run:

```powershell
python -m http.server 5173
```

Then visit `http://localhost:5173/frontend/`.

The UI uses the local `api-client.js` for live events, registration, and “my registrations” requests. Set the Render backend URL in that file before deploying to Vercel. If the API cannot be reached, sample events are shown so the interface remains previewable.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Render and Vercel setup.
