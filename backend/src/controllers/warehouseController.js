import db from '../models/index'

let getWarehouses = async (req, res) => {
    try {
        const warehouseList = await db.Location.findAll();
        return res.json({
            warehouseList: [...warehouseList],
        }
        )
    }
    catch (e) {
        console.log(e);
    }
}


module.exports = {
  getWarehouses: getWarehouses,
}