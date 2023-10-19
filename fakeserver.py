
import websockets
import asyncio



    
async def handler(websocket):
    global init
    if(not init):
        th = threading.Thread(target=asyncio.run, args=(uart_listener(websocket),))
        th.start()
        init = True
    while True:
        try: 
            message = await websocket.recv()
            if(message=="start"):
                print("start")
                GPIO.output(11, 0)
        except websockets.exceptions.ConnectionClosed:
            global closed
            closed = True
            init = False
            break
        except Exception as e:
            print(e, "error")

start_server = websockets.serve(handler, "localhost", 8000)
 
 
asyncio.get_event_loop().run_until_complete(start_server)
 
asyncio.get_event_loop().run_forever()