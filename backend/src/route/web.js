import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import dataController from "../controllers/dataController"
import warehouseController from "../controllers/warehouseController"
import equipmentController from "../controllers/equipmentController"



const baseApi = "/api/warehouses"
let router = express.Router();

let initWebRoutes = (app) => {
	//data api
	router.get(baseApi + '/data/hourly/:warehouseId', dataController.getHourlyData)
	router.get(baseApi + '/data/sensor/:warehouseId', dataController.getPresentSensorData)
	router.get(baseApi + '/data/sensor/datalog/:warehouseId/:type', dataController.getSensorDataLog)
	router.get(baseApi + '/data/equipment/:warehouseId', dataController.getPresentData)
	
	//warehouse api
	router.get(baseApi + '/warehouses', warehouseController.getWarehouses)
	
	//equipment api
	router.get(baseApi + '/equipments/:warehouseId', equipmentController.getEquipmentByWarehouseId)
	
	//user api
	router.get(baseApi + '/users/:userID', userController.getUser)
	
	//rest api
	router.get('/crud', homeController.getCRUD)
	router.get('/', homeController.getHomePage);




	return app.use("/", router)
}

module.exports = initWebRoutes