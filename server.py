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

def uart_listener(websocket):
    while True:
        received_data = ser.read()  
        print(received_data)  
        print(int.from_bytes(received_data, byteorder='little'))
        if (int.from_bytes(received_data, byteorder='little') == 11):
            time.sleep(1.5)
            GPIO.output(11, 1)
            print("on")
        elif(received_data): 
            websocket.send(received_data)

        
    
async def handler(websocket):
    print("msg")
    th = threading.Thread(target=uart_listener, args=(websocket,))
    th.start()
    print("msg2")
    while True:
        try: 
            message = await websocket.recv()
            if(message=="start"):
                print("start")
                GPIO.output(11, 0)
        except Exception as e:
            print(e, "error")
initt = True
start_server = websockets.serve(handler, "localhost", 8000)
 
 
asyncio.get_event_loop().run_until_complete(start_server)
 
asyncio.get_event_loop().run_forever()