import sys
from aio_config import *
import globals as g
from readSerial import *


def connected(client):
    print("Listening for all feed changes...")
    client.subscribe(FEED_TEMP)
    client.subscribe(FEED_HUMIDITY)
    client.subscribe(FEED_LIGHT)
    client.subscribe(FEED_GAS)
    client.subscribe(FEED_CONDITION)
    client.subscribe(FEED_LED)
    client.subscribe(FEED_DOOR)


def subscribe(client, userdata, mid, granted_qos):
    print("Subscribed successful!")


def disconnected(client):
    print("Disconnected from Adafruit IO!")
    sys.exit(1)


def message(client, feed_id, payload):
    # if feed_id == FEED_REFRESHER or feed_id == FEED_LIGHT or feed_id == FEED_FAN:
    #     print(feed_id + " received new request: " + payload)

    if feed_id == FEED_TEMP or feed_id == FEED_HUMIDITY or feed_id == FEED_LIGHT or feed_id == FEED_GAS:
        g.lastSentOK = True
        print(feed_id + " received ACK: " + payload)
    elif feed_id == FEED_LED:
        print("!C_LED:"+payload+"#")
        writeSerial("!C_LED:"+ payload + "#")
    elif feed_id == FEED_CONDITION:
        print("!C_CONDITION:"+payload+"#")
        writeSerial("!C_CONDITION:"+payload + "#")
    elif feed_id == FEED_DOOR:
        print("!C_DOOR"+payload+"#")
        writeSerial("!C_DOOR:"+payload + "#")
        

# data: !1;TEMP:20;HUMI:30;LIGHT:300;GAS:20#
def publishData(data, flagSendAgain):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(";")
    for i in range(1, len(splitData)):
        splitData[i] = splitData[i].split(":")
    if not flagSendAgain:
        print("Publish new: STT:" + str(data))
     
    for element in splitData:
        if len(element) > 1:
            if element[0] == "TEMP":
                client.publish(FEED_TEMP, element[1])
                # print("TEMP", element[1])
            elif element[0] == "HUMI":
                client.publish(FEED_HUMIDITY, element[1])
                # print("HUMI", element[1])
            elif element[0] == "LIGHT":
                client.publish(FEED_LIGHT, element[1])
                # print("LIGHT", element[1])
            elif element[0] == "GAS":
                client.publish(FEED_GAS, element[1])
                # print("GAS", element[1])
