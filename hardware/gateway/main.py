import time
from datetime import datetime
from readSerial import *
from mqttCallback import *
from aio_config import *
import globals as g

def main():
    client.on_connect = connected
    client.on_disconnect = disconnected
    client.on_message = message
    client.on_subscribe = subscribe
    client.connect()
    client.loop_background()
    
    isRead = 500
    timeResend = 0
    numOfResend = 0
    isSleep = False
    timeSleep = 0
    numOfSleep = 0
    
    # Sleep 5s to connect to Server
    # sleep(5)
    i = 0
    now = datetime.now()
    print(now)
    while True:
        if g.isComConnect:
            i += 1
            if isRead == 0 and g.lastSentOK:
                now = datetime.now()
                print(now)
                if readSerial():
                    publishData(g.data, False)
                    isRead = g.TIME_TO_READ
                    g.dataSave = g.data
                    g.data = ""
                    g.lastSentOK = False
                    timeResend = g.TIME_TO_RESEND
                    numOfResend = 0
                    numOfSleep = 0
                else:
                    if g.readAgain == 0:
                        g.getData = True
                    
            # resend after g.TIME_TO_RESEND (ms)
            if not g.lastSentOK and timeResend == 0 and not isSleep:
                timeResend = g.TIME_TO_RESEND
                publishData(g.dataSave, True)
                numOfResend += 1
                print("Resend " + str(g.dataSave) + " =+= " + str(numOfResend) + " times")
                
            # after resend g.MAX_NUM_OF_RESEND times, change system to sleep g.TIME_SLEEP (ms)
            # stop resending
            if not g.lastSentOK and numOfResend >= g.MAX_NUM_OF_RESEND:
                isSleep = True
                timeSleep = g.TIME_SLEEP
                numOfResend = 0
                print(str(g.MAX_NUM_OF_RESEND) + " times resend failed. Stop resending!")
            
            # after sleep g.TIME_SLEEP (ms), countinue resend again
            if not g.lastSentOK and timeSleep == 0 and isSleep:
                isSleep = False
                numOfSleep += 1
                timeResend = 0
            
            # after sleep g.MAX_NUM_OF_SLEEP (ms), skip resend data, begin change to send new data
            if not g.lastSentOK and numOfSleep >= g.MAX_NUM_OF_SLEEP:
                g.lastSentOK = True
                timeSleep = 0
                timeResend = 0
                isSleep = False
                numOfResend = 0
                numOfSleep = 0
                g.dataSave = ""
                print("Send data failed. Skip data this time!")
            
            if isRead > 0:
                # print(isRead, "\n")
                isRead -= 1
            if timeResend > 0:
                timeResend -= 1
            if timeSleep > 0:
                timeSleep -= 1
            if g.readAgain > 0:
                g.readAgain -= 1
            time.sleep(0.001)      
        else:
            print("None serial port !!!")


if __name__ == "__main__":
    main()
    
    
    