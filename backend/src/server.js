require('dotenv').config();
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { client as mqtt, FEED_CONDITION, FEED_DOOR, FEED_GAS, FEED_HUMIDITY, FEED_LED, FEED_LIGHT, FEED_TEMP, topics } from './config/configMqtt';
import { subscribeFeed } from "./services/subMqtt";
import { processRequest, sendRealtimeData } from "./services/listenEventSocket.io";
require('events').EventEmitter.defaultMaxListeners = 0;

const app = express();
const port = process.env.PORT || 6969;
const server = createServer(app);
const io = new Server(server, {cors: { origin: "*" }});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

// mqtt
subscribeFeed(mqtt);

// socket.io
processRequest(io, mqtt);

sendRealtimeData(io, mqtt);
// mqtt.on('message', (topic, payload) => {
// 	let type = '';
// 	switch(topic) {
// 		case FEED_DOOR: {
// 			type = 'Door';
// 			break;
// 		}
// 		case FEED_CONDITION: {
// 			type = 'Cooler';
// 			break;
// 		}
// 		case FEED_LED: {
// 			type = 'Light';
// 			break;
// 		}
// 		case FEED_HUMIDITY: {
// 			type = 'Humid';
// 			break;
// 		}
// 		case FEED_TEMP: {
// 			type = 'Temp';
// 			break;
// 		}
// 		case FEED_LIGHT: {
// 			type = 'LighSensor';
// 			break;
// 		}
// 		case FEED_GAS: {
// 			type = 'Gas';
// 			break;
// 		}
// 		default: break;
// 	}
// 	const res = JSON.stringify({
// 		type, data: payload.toString()
// 	})
// 	console.log(res)
// 	io.emit('sendRealtimeData', res);
// })

server.listen(port, () => {
	console.log("Backend Nodejs is running on the port: " + port)
});

