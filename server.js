const { SerialPort } = require('serialport')
const WebSocket = require('ws');
const gpio = require('rpi-gpio')

const wss = new WebSocket.WebSocketServer({ port: 8000 });
const serialport = new SerialPort({ path: '/dev/ttyS0', baudRate: 100000 }) 
gpio.setup(11, gpio.DIR_HIGH);



wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    serialport.on('data', function (data) {
      console.log('Data:', data.toString('HEX'))
      if(String(data) == 1) {
        gpio.write(11,1);
      }
     ws.send(data.toString('HEX'))
    })
    ws.on('message', function message(msg) {
      if(String(msg)=="start") {
        gpio.write(11, 0)
      }
      console.log(String(msg))
      serialport.write(msg)
    });
    console.log("connect")
  });
