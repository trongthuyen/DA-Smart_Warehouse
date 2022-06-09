import db, { sequelize } from '../models/index'
import moment from 'moment';
import { Op } from 'sequelize';

let getRealtimePresentData = async (payload) => {
	try {
		const { locationId } = payload;
		const lightData = await db.MagneticSwitch.findAll({
			where: { category: "light" },
			order: [
				['id', 'DESC']
			],
			limit: 1
		});
		const coolerData = await db.MagneticSwitch.findAll({
			where: { category: "cooler" },
			order: [
				['id', 'DESC']
			],
			limit: 1
		});
		const doorData = await db.MagneticSwitch.findAll({
			where: { category: "door" },
			order: [
				['id', 'DESC']
			],
			limit: 1
		});
		const light = {
			id: lightData[0].id,
			name: lightData[0].name,
			position: lightData[0].description,
			ages: 5,
			rise: true,
			mode: lightData[0].state,
			imgId: "https://svgshare.com/i/gj3.svg"
		}
		const cooler = {
			id: coolerData[0].id,
			name: coolerData[0].name,
			position: coolerData[0].description,
			ages: 5,
			rise: true,
			mode: coolerData[0].state,
			imgId: "https://svgshare.com/i/gj3.svg"
		}
		const door = {
			id: doorData[0].id,
			name: doorData[0].name,
			position: doorData[0].description,
			ages: 5,
			rise: true,
			mode: doorData[0].state,
			imgId: "https://svgshare.com/i/gj3.svg"
		}

		return res.json({
			equipmentData: [light, cooler, door]
		}
		)
		// return res.render('homepage.ejs', {
		//     data: JSON.stringify(data)
		// })
	}
	catch (e) {
		console.log(e);
	}
}

let getPresentData = async (req, res) => {
	try {
		const locationId = req.params.warehouseId;
		const lightData = await db.MagneticSwitch.findAll({
			where: { category: "light" },
			order: [
				['id', 'DESC']
			],
			limit: 1
		});
		const coolerData = await db.MagneticSwitch.findAll({
			where: { category: "cooler" },
			order: [
				['id', 'DESC']
			],
			limit: 1
		});
		const doorData = await db.MagneticSwitch.findAll({
			where: { category: "door" },
			order: [
				['id', 'DESC']
			],
			limit: 1
		});
		const light = {
			id: lightData[0].id,
			name: lightData[0].name,
			type: lightData[0].category,
			position: lightData[0].description,
			ages: 5,
			rise: true,
			mode: lightData[0].state,
			imgId: "https://svgshare.com/i/gj3.svg"
		}
		const cooler = {
			id: coolerData[0].id,
			name: coolerData[0].name,
			type: coolerData[0].category,
			position: coolerData[0].description,
			ages: 5,
			rise: true,
			mode: coolerData[0].state,
			imgId: "https://svgshare.com/i/gj3.svg"
		}
		const door = {
			id: doorData[0].id,
			name: doorData[0].name,
			type: doorData[0].category,
			position: doorData[0].description,
			ages: 5,
			rise: true,
			mode: doorData[0].state,
			imgId: "https://svgshare.com/i/gj3.svg"
		}

		return res.json({
			equipmentData: [light, cooler, door]
		}
		)
		// return res.render('homepage.ejs', {
		//     data: JSON.stringify(data)
		// })
	}
	catch (e) {
		console.log(e);
	}
}

const getPresentSensorData = async (req, res) => {
	try {
		const locationId = req.params.warehouseId;
		const dht11Temp = await db.Dht11.findAll({
			where: {
				locationId: locationId,
				temp: {[Op.not] : null}
			},
			order: [
				['createdAt', 'DESC']
			],
			limit: 1
		})
		const dht11Humi = await db.Dht11.findAll({
			where: {
				locationId: locationId,
				humi: { [Op.not]: null }
			},
			order: [
				['createdAt', 'DESC']
			],
			limit: 1
		})
		const light = await db.LightSensor.findAll({
			where: { locationId: locationId },
			order: [
				['createdAt', 'DESC']
			],
			limit: 1
		})
		const gas = await db.GasSensor.findAll({
			where: { locationId: locationId },
			order: [
				['createdAt', 'DESC']
			],
			limit: 1
		})
		const presentSensorData = {
			intensityLight: parseFloat(light[0]?.intensity),
			temperature: parseFloat(dht11Temp[0]?.temp),
			humidity: parseFloat(dht11Humi[0]?.humi),
			emitGas: gas[0].danger > 200 ? true : false,
		}
		return res.json({
			presentSensorData
		})
	} catch (error) {
		console.log(error)
	}
}

let getSensorDataLog = async (req, res) => {
	try {
		const locationId = req.params.warehouseId;
		const type = req.params.type;
		// const date = moment();
		let sqlTemp = '';
		let sqlHumi = '';
		if(type === 'H') {
			sqlTemp	= `SELECT * FROM dht11s WHERE temp IS NOT NULL AND locationId = '${locationId}' ORDER BY createdAt`;
			sqlHumi	= `SELECT * FROM dht11s WHERE humi IS NOT NULL AND locationId = '${locationId}' ORDER BY createdAt`;
		} else {
			sqlTemp	= `SELECT * FROM dht11s WHERE temp IS NOT NULL AND locationId = '${locationId}' ORDER BY createdAt`;
			sqlHumi	= `SELECT * FROM dht11s WHERE humi IS NOT NULL AND locationId = '${locationId}' ORDER BY createdAt`;
		}
		const sensorTempDataLog = await sequelize.query(sqlTemp, {raw: true});
		const sensorHumiDataLog = await sequelize.query(sqlHumi, {raw: true});
		const formatedSensorDataLog = sensorTempDataLog[0].map((s, index) => ({
			amt: index,
			// name: `${moment(s.createdAt).format('HH:MM:SS')}`,
			name: index,
			humid: sensorHumiDataLog[0][index].humi,
			temper: s.temp,
		}))

		return res.json({
			sensorDataLog: formatedSensorDataLog,
		})
	}
	catch (e) {
		console.log(e);
	}
}

let getHourlyData = async (req, res) => {
	try {
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
		const dht11 = [];
		const temps = Array(24).fill(0)
		const humis = Array(24).fill(0)
		for (let i = 0; i < hours.length; i++) {
			dht11[i] = await sequelize.query("SELECT * FROM `dht11s` WHERE DAY(dht11s.createdAt) =" + dd + " AND HOUR(dht11s.createdAt) = " + hours[i], {
			})
			for (let j = 0; j < dht11[i][0].length; j++) {
				temps[i] += parseInt(dht11[i][0][j].temp)
				humis[i] += parseInt(dht11[i][0][j].humi)
			}
			temps[i] /= dht11[i][0].length
			humis[i] /= dht11[i][0].length
		}
		const hourlyData = [];
		for (let i = 0; i < hours.length; i++) {
			hourlyData[i] = {
				amt: Math.floor(Math.random() * 10),
				humid: humis[i] !== NaN ? humis[i] : 0,
				name: i,
				temper: temps[i] !== NaN ? temps[i] : 0,
			}
		}
		return res.json({
			hourlyData
		})
	}
	catch (e) {
		console.log(e);
	}
}

let getDailyData = async (req, res) => {
	try {
		let today = new Date();
		let mm = String(today.getMonth() + 1).padStart(2, '0');
		let days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
		const dht11 = [];
		const temps = Array(31).fill(0)
		const humis = Array(31).fill(0)
		const dailyData = []

		console.log(dht11[1])
		for (let i = 0; i < days.length; i++) {
			dht11[i] = await sequelize.query("SELECT * FROM `dht11s` WHERE MONTH(dht11s.createdAt) =" + mm + " AND DAY(dht11s.createdAt) = " + days[i], {
			})
			for (let j = 0; j < dht11[i][0].length; j++) {
				temps[i] += parseInt(dht11[i][0][j].temp)
				humis[i] += parseInt(dht11[i][0][j].humi)
			}
			temps[i] /= dht11[i][0].length
			humis[i] /= dht11[i][0].length
		}
		for (let i = 0; i < days.length; i++) {
			dailyData[i] = {
				amt: Math.floor(Math.random() * 10),
				humid: humis[i] !== NaN ? humis[i] : 0,
				name: days[i],
				temper: temps[i] !== NaN ? temps[i] : 0,
			}
		}
		return res.json({
			dailyData
		})

	}
	catch (e) {
		console.log(e);
	}
}

let getMonthlyData = async (req, res) => {
	try {
		let today = new Date();
		let yyyy = today.getFullYear();
		let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		const dht11 = [];
		const temps = Array(12).fill(0)
		const humis = Array(12).fill(0)
		const monthlyData = []

		for (let i = 0; i < months.length; i++) {
			dht11[i] = await sequelize.query("SELECT * FROM `dht11s` WHERE YEAR(dht11s.createdAt) =" + yyyy + " AND MONTH(dht11s.createdAt) = " + months[i], {
			})
			for (let j = 0; j < dht11[i][0].length; j++) {
				temps[i] += parseInt(dht11[i][0][j].temp)
				humis[i] += parseInt(dht11[i][0][j].humi)
			}
			temps[i] /= dht11[i][0].length
			humis[i] /= dht11[i][0].length
		}
		for (let i = 0; i < months.length; i++) {
			monthlyData[i] = {
				amt: Math.floor(Math.random() * 10),
				humid: humis[i] !== NaN ? humis[i] : 0,
				name: months[i],
				temper: temps[i] !== NaN ? temps[i] : 0,
			}
		}
		return res.json({
			monthlyData
		})

	}
	catch (e) {
		console.log(e);
	}
}

const insertNewSensorValue = async (payload) => {
	try {
		const { locationId, type, value } = payload;
		const date = moment().format('yyyy-mm-DD HH:MM:SS');
		let sql = '';
		switch (type) {
			case 'LightSensor': {
				sql = `INSERT INTO lightsensors (name, intensity, locationId) VALUES('light sensor room 1', '${value}', '${locationId}')`
				break;
			}
			case 'Temp': {
				sql = `INSERT INTO dht11s (name, temp, locationId) VALUES('dht11 sensor room 1', '${value}', '${locationId}')`
				break;
			}
			case 'Humid': {
				sql = `INSERT INTO dht11s (name, humi, locationId) VALUES('dht11 sensor room 1', '${value}', '${locationId}')`
				break;
			}
			case 'Gas': {
				sql = `INSERT INTO gassensors (name, danger, locationId) VALUES('gas sensor room 1', '${value}', '${locationId}')`
				break;
			}
			default: break;
		}
		await sequelize.query(sql);
	} catch (error) {
		console.log(error)
	}
}

const updateSensorValue = async (payload) => {
	try {
		const { locationId, type, value } = payload;
		let sql = '';
		switch (type) {
			case 'LightSensor': {
				sql = `UPDATE lightsensors SET intensity = ${value} WHERE locationId = ${locationId}`;
				break;
			}
			case 'Temp': {
				// sql = `UPDATE dht11s SET temp = ${value} WHERE locationId = ${locationId}`;
				break;
			}
			case 'Gas': {
				sql = `UPDATE gassensors SET danger = ${value} WHERE locationId = ${locationId}`;
				break;
			}
			default: break;
		}
		await sequelize.query(sql);
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getPresentData: getPresentData,
	getHourlyData: getHourlyData,
	getPresentSensorData: getPresentSensorData,
	getSensorDataLog: getSensorDataLog,
	getDailyData: getDailyData,
	getMonthlyData: getMonthlyData,
	insertNewSensorValue: insertNewSensorValue,
	updateSensorValue: updateSensorValue,
	getRealtimePresentData: getRealtimePresentData,
}