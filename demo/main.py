from fastapi import FastAPI, WebSocket
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

# Servir les fichiers statiques de React
frontend_dist_path = os.path.join(os.path.dirname(__file__), "../frontend/dist")
app.mount("/static", StaticFiles(directory=frontend_dist_path), name="static")

# Servir l'index.html (SPA)
@app.get("/")
async def serve_spa():
    return FileResponse(os.path.join(frontend_dist_path, "index.html"))

# Exemple de WebSocket (remplace par ta logique réelle)
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Echo: {data}")
