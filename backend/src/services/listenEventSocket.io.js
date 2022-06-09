import { FEED_CONDITION, FEED_DOOR, FEED_GAS, FEED_HUMIDITY, FEED_LED, FEED_LIGHT, FEED_TEMP } from '../config/configMqtt';
import * as equipmentController from '../controllers/equipmentController'
import * as dataController from '../controllers/dataController'
import { WAREHOUSEID } from '../../constants';


export function processRequest(io, mqtt) {
  io.on('connection', (socket) => {
    let flagSendMessage = false;
    socket.on('sendRequestControl', payload => {
      const { equipmentId, topic, value } = payload;
      // publish to mqtt
      mqtt.publish(topic, value, (error) => {
        if(error) console.error(error);
      })
      mqtt.on('message', (topic, payload) => {
        if(!flagSendMessage) {
          // console.log(`${topic}: ${payload.toString()}`)
          const data = {
            id: equipmentId,
            category: '',
            temp: topic === FEED_CONDITION ? payload.toString() : undefined,
            state: topic !== FEED_CONDITION ? payload.toString() : undefined,
          }
          equipmentController.updateEquipmentState(data);
          flagSendMessage = true;
        }
        // disconnect
        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
      })
      flagSendMessage = false;
      // response to front end
    });

  });
}

export function sendRealtimeData(io, mqtt) {
  mqtt.on('message', (topic, payload) => {
    console.log(topic, payload)
    let type = '';
    let data;
    switch(topic) {
      case FEED_DOOR: {
        type = 'Door';
        break;
      }
      case FEED_CONDITION: {
        type = 'Cooler';
        break;
      }
      case FEED_LED: {
        type = 'Light';
        break;
      }
      default: break;
    }
    if(type) {
      data = {
        id: 0,
        category: type,
        // temp: topic === FEED_CONDITION ? payload.toString() : undefined,
        // state: topic !== FEED_CONDITION ? payload.toString() : undefined,
        temp: '',
        state: payload.toString(),
      }
      equipmentController.updateEquipmentState(data);
    }
    type = '';
    switch (topic) {
      case FEED_HUMIDITY: {
        type = 'Humid';
        break;
      }
      case FEED_TEMP: {
        type = 'Temp';
        break;
      }
      case FEED_LIGHT: {
        type = 'LightSensor';
        break;
      }
      case FEED_GAS: {
        type = 'Gas';
        break;
      }
      default: break;
    }
    if(type) {
      data = {
        locationId: WAREHOUSEID,
        type: type,
        value: payload.toString(),
      }
      dataController.insertNewSensorValue(data);
    }

    // console.log(topic);
    const res = JSON.stringify({
      type, data: payload.toString()
    })
    // console.log(res)
    io.emit('sendRealtimeData', res);
  })
}
