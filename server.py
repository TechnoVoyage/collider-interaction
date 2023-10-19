import serial
import time
import websockets
import asyncio
import RPi.GPIO as GPIO
import threading
ser = serial.Serial (port = "/dev/ttyS0", baudrate= 100000,parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,) 
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.OUT)
GPIO.output(11, 1)
init = False
closed = False
async def uart_listener(websocket):
    global closed
    while True:
        if(closed):
            closed = False
            break
        received_data = ser.read()  
        print(received_data)  
        print(int.from_bytes(received_data, byteorder='little'))
        if (int.from_bytes(received_data, byteorder='little') == 1):
            GPIO.output(11, 1)
            print("on")
        if(received_data): 
            await websocket.send(received_data)

        
    
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