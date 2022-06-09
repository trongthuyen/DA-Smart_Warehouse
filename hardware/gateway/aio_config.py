from Adafruit_IO import MQTTClient
AIO_USERNAME = ""
AIO_KEY = ""

FEED_TEMP = "smart-warehouse.bbc-temp"
FEED_HUMIDITY = "smart-warehouse.bbc-humi"
FEED_LIGHT = "smart-warehouse.bbc-light"
FEED_GAS = "smart-warehouse.bbc-gas"
FEED_CONDITION = "smart-warehouse.bbc-condition"
FEED_LED = "smart-warehouse.bbc-led"
FEED_DOOR = "smart-warehouse.bbc-door"

client = MQTTClient(AIO_USERNAME, AIO_KEY)
