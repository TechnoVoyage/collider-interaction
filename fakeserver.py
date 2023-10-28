
import websockets
import asyncio



    
async def handler(websocket):
    print("wait")
    print(await websocket.recv())
    input()
    await websocket.send("11")
    while True:
        a = input()
        await websocket.send(a)
        print("sent", a)

start_server = websockets.serve(handler, "192.168.40.181", 8000)
 
 
asyncio.get_event_loop().run_until_complete(start_server)
 
asyncio.get_event_loop().run_forever()