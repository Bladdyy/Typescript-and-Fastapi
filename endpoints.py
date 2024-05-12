import asyncio
import random
from fastapi import FastAPI, HTTPException

app = FastAPI()

LUCK = 10


@app.get("/picture")
async def get_picture():
    luck = random.randint(1, 100)
    if luck <= 100 - LUCK:
        rects = []
        hexs = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        num = luck
        if luck > 100 - 2 * LUCK:
            num = 1000000
        elif luck > 100 - 3 * LUCK:
            await asyncio.sleep(10)

        # Generating 'num' rectangles.
        for i in range(num):
            rect = {}
            height = random.randint(10, 400)
            width = random.randint(10, 400)
            rect.update({"height": height})
            rect.update({"width": width})
            rect.update({"x": random.randint(0, 400 - width)})
            rect.update({"y": random.randint(0, 400 - height)})
            color = "#"
            for x in range(6):
                color += random.choice(hexs)
            rect.update({"color": color})
            rects.append(rect)
        return {"rects": rects}
    else:
        raise HTTPException(status_code=500, detail="Item not found")