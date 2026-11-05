import os
import json
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from pathlib import Path
from flask import Flask, Response, request, send_from_directory
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / '.env')

app = Flask(__name__)

PROJECT_ROOT = Path(__file__).resolve().parent.parent
FRONTEND_DIR = PROJECT_ROOT / 'frontend'
API_CLIENT_DIR = PROJECT_ROOT / 'stitch_campus_connect_' / 'stitch_campus_connect_mobile_ui'
EXPLORE_DIR = API_CLIENT_DIR / 'desktop_portal_explore_events'
EVENT_DETAILS_DIR = API_CLIENT_DIR / 'desktop_portal_event_details_registration'
REMOTE_API_BASE = 'https://hello-world-workshop.onrender.com'
FRONTEND_ORIGIN = os.environ.get('FRONTEND_ORIGIN', '*').rstrip('/')

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)

@app.after_request
def add_cors_headers(response):
    origin = request.headers.get('Origin')
    if FRONTEND_ORIGIN == '*' or origin == FRONTEND_ORIGIN:
        response.headers['Access-Control-Allow-Origin'] = '*' if FRONTEND_ORIGIN == '*' else origin
        response.headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        if FRONTEND_ORIGIN != '*':
            response.headers['Vary'] = 'Origin'
    return response

@app.route('/')
def index():
    # Serve the supplied Stitch explore-events design as the application home.
    return send_from_directory(EXPLORE_DIR, 'code.html')

@app.route('/health')
def health():
    return {'status': 'ok'}

@app.route('/styles.css')
def styles():
    return send_from_directory(FRONTEND_DIR, 'styles.css')

@app.route('/app.js')
def frontend_script():
    return send_from_directory(FRONTEND_DIR, 'app.js')

@app.route('/stitch_campus_connect_/stitch_campus_connect_mobile_ui/api-client.js')
def api_client():
    return send_from_directory(API_CLIENT_DIR, 'api-client.js')

@app.route('/api-client.js')
def root_api_client():
    return send_from_directory(API_CLIENT_DIR, 'api-client.js')

@app.route('/desktop_portal_event_details_registration/code.html')
def event_details():
    return send_from_directory(EVENT_DETAILS_DIR, 'code.html')

def proxy_api(path, method='GET'):
    """Proxy the remote API server-side so the browser is not blocked by CORS."""
    body = request.get_data() or None
    headers = {'Accept': 'application/json'}
    if body:
        headers['Content-Type'] = request.headers.get('Content-Type', 'application/json')
    token = request.headers.get('Authorization')
    if token:
        headers['Authorization'] = token
    try:
        upstream = Request(f'{REMOTE_API_BASE}{path}', data=body, headers=headers, method=method)
        with urlopen(upstream, timeout=20) as response:
            content_type = response.headers.get('Content-Type', 'application/json')
            return Response(response.read(), status=response.status, content_type=content_type)
    except HTTPError as error:
        return Response(error.read(), status=error.code, content_type=error.headers.get('Content-Type', 'application/json'))
    except (URLError, TimeoutError) as error:
        return Response(json.dumps({'detail': f'Upstream API unavailable: {error}'}), status=502, content_type='application/json')

@app.route('/api/events', methods=['GET'])
def proxy_events():
    return proxy_api('/api/events')

@app.route('/api/events/<event_id>', methods=['GET'])
def proxy_event(event_id):
    return proxy_api(f'/api/events/{event_id}')

@app.route('/api/events/<event_id>/registrations', methods=['GET'])
def proxy_event_registrations(event_id):
    return proxy_api(f'/api/events/{event_id}/registrations')

@app.route('/api/registrations', methods=['POST'])
def proxy_registration():
    return proxy_api('/api/registrations', method='POST')

@app.route('/api/me/registrations', methods=['GET'])
def proxy_my_registrations():
    return proxy_api('/api/me/registrations')

@app.route('/api/auth/login', methods=['POST'])
def auth_login():
    """Exchange Supabase email/password credentials for a user access token."""
    payload = request.get_json(silent=True) or {}
    email = str(payload.get('email', '')).strip()
    password = payload.get('password', '')
    if not email or not password:
        return {'detail': 'Email and password are required.'}, 400

    auth_url = f"{os.environ['SUPABASE_URL'].rstrip('/')}/auth/v1/token?grant_type=password"
    auth_request = Request(
        auth_url,
        data=json.dumps({'email': email, 'password': password}).encode('utf-8'),
        headers={
            'apikey': os.environ['SUPABASE_KEY'],
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method='POST',
    )
    try:
        with urlopen(auth_request, timeout=20) as response:
            return Response(response.read(), status=response.status, content_type='application/json')
    except HTTPError as error:
        return Response(error.read(), status=error.code, content_type='application/json')
    except (URLError, TimeoutError) as error:
        return {'detail': f'Authentication service unavailable: {error}'}, 502

@app.route('/users')
def users():
    response = supabase.table('Users').select("*").execute()
    users = response.data

    html = '<h1>Users</h1><ul>'
    for user in users:
        html += f'<li>{user["email"]}</li>'
    html += '</ul>'

    return html

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', '5000')), debug=os.environ.get('FLASK_DEBUG') == '1')
