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

async def uart_listener(websocket):
    while True:
        received_data = ser.read()  
        print(received_data)  
        print(int.from_bytes(received_data, byteorder='little'))
        await  websocket.send(str(int.from_bytes(received_data, byteorder='little')))
        if (int.from_bytes(received_data, byteorder='little') == 1):
            GPIO.output(11, 1)

        
    
async def handler(websocket):
    th = threading.Thread(target=asyncio.run, args=(uart_listener(websocket),))
    th.start()
    while True:
        try: 
            message = await websocket.recv()
            if(message=="start"):
                print("start")
                GPIO.output(11, 0)
        except Exception as e:
            print(e, "error")
start_server = websockets.serve(handler, "192.168.1.10", 8000)
 
while True:
 try: 
  asyncio.get_event_loop().run_until_complete(start_server)
  asyncio.get_event_loop().run_forever()
  break
 except BaseException as e:
  print(e)
  continue
