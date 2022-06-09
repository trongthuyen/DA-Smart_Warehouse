import time
from matplotlib.pyplot import get
import serial.tools.list_ports
import globals as g

def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    for i in range(0, N):
        port = ports[i]
        strPort = str(port)
        splitPort = strPort.split(" ")
        commPort = (splitPort[0])
    return commPort

def readSerial():
    if(g.getData):
        print("GET");
        ser.write(("!GET#").encode());
        g.getData = False
        g.readAgain = g.TIME_TO_READ_SERIAL_AGAIN
    bytesToRead = ser.inWaiting()
    mess = ser.read(bytesToRead).decode("UTF-8")
    start = mess.find("!")
    end = mess.find("#")
    if ((start == -1) or (end == -1)):
        return False
    g.data = mess[start:end+1]
    while(end < bytesToRead - 1):
        bytesToRead -= end
        mess = mess[end+1:]
        start = mess.find("!")
        end = mess.find("#")
        g.data += mess[start:end+1]
        
    print(g.data)
    mess = ""
    g.getData = True
    return True

def writeSerial(message):
    ser.write(message.encode())

if getPort() != "None":
    portName = getPort()
    ser = serial.Serial(portName, baudrate=115200)
    print("Connected with " + portName)
    print("Connect port successfully!")
    g.isComConnect = True
    