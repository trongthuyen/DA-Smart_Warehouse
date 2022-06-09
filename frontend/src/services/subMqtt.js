import { topics } from "../configs/configMqtt"

export const subscribeFeed = (client) => {
  client.on('connect', () => {
    console.log('Connected')
    topics.map(topic => {
      client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
      })
    })
  })
}