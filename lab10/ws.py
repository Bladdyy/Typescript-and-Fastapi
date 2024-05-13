import random
from asyncio import sleep
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

SIZE = 380
app = FastAPI()


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for websocket in self.active_connections:
            await websocket.send_json(message)


manager = ConnectionManager()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@app.get("/picture")
async def get_pict():
    num = random.randint(1, 100)
    rects = []
    hexs = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    for i in range(num):
        rect = {}
        height = random.randint(10, SIZE)
        width = random.randint(10, SIZE)
        rect.update({"height": height})
        rect.update({"width": width})
        rect.update({"x": random.randint(0, SIZE - width)})
        rect.update({"y": random.randint(0, SIZE - height)})
        color = "#"
        for x in range(6):
            color += random.choice(hexs)
        rect.update({"color": color})
        rects.append(rect)
    await manager.broadcast({"rects": rects})

    return {"rects": rects}
