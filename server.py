import asyncio
import serial
import websockets

ser = serial.Serial ("/dev/ttyS0", 100000) 
async def uart_listener(websocket):
    while True:
        received_data = ser.read()      
        await asyncio.sleep(0.03)
        if(received_data): await websocket.send(received_data)
        await asyncio.sleep(0)
    
async def handler(websocket):
    init = True
    if(init):
        init = False
        asyncio.ensure_future(uart_listener(websocket))
    async for message in websocket:
        ser.write(int(message))
 
start_server = websockets.serve(handler, "localhost", 8000)
 
 
 
asyncio.get_event_loop().run_until_complete(start_server)
 
asyncio.get_event_loop().run_forever()