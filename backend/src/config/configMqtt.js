import mqtt from 'mqtt'

const host = 'io.adafruit.com'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${port}`


export const AIO_USERNAME = ""
export const AIO_KEY = ""

export const FEED_TEMP = AIO_USERNAME + "/feeds/smart-warehouse.bbc-temp"
export const FEED_HUMIDITY = AIO_USERNAME + "/feeds/smart-warehouse.bbc-humi"
export const FEED_LIGHT = AIO_USERNAME + "/feeds/smart-warehouse.bbc-light"
export const FEED_GAS = AIO_USERNAME + "/feeds/smart-warehouse.bbc-gas"
export const FEED_CONDITION = AIO_USERNAME + "/feeds/smart-warehouse.bbc-condition"
export const FEED_LED = AIO_USERNAME + "/feeds/smart-warehouse.bbc-led"
export const FEED_DOOR = AIO_USERNAME + "/feeds/smart-warehouse.bbc-door"

export const topics = [
  FEED_TEMP,
  FEED_HUMIDITY,
  FEED_LIGHT,
  FEED_GAS,
  FEED_CONDITION,
  FEED_LED,
  FEED_DOOR,
]


export const client = mqtt.connect(connectUrl, {
  clientId,
  protocol: 'mqtt',
  clean: true,
  connectTimeout: 4000,
  username: AIO_USERNAME,
  password: AIO_KEY,
  reconnectPeriod: 1000,
})
