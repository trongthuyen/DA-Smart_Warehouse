import db, { sequelize } from '../models/index'

let getEquipmentByWarehouseId = async (req, res) => {
    try {
      const equipmentList = await db.MagneticSwitch.findAll({
        where: {
          locationId: req.params.warehouseId
        }
      });
      return res.json({
          equipmentList: [...equipmentList],
      }
      )
    }
    catch (e) {
        console.log(e);
    }
}

const updateEquipmentState = async (payload) => {
  try {
    const { id, category, temp, state } = payload;
    let sql = '';
    sql = `UPDATE magneticswitches SET temp = NULL, state = ${state} WHERE category = '${category}'`
    // if(temp !== undefined) {
    //   sql = `UPDATE magneticswitches SET temp = '${temp}' WHERE id = ${id} OR category = '${category}'`;
    // } else {
    //   sql = `UPDATE magneticswitches SET state = ${state} WHERE id = ${id} OR category = '${category}'`;
    // }
    const result = await sequelize.query(sql);
    return result;
  } catch (error) {
    console.log(error);
  }
}

const updateEquipmentInfo = async (req, res) => {
  try {
    const { id, name, category, description, locationId } = req.body;
    const sql = `UPDATE magneticswitches SET name = '${name}', category = '${category}', description = '${description}', locationId = '${locationId}' WHERE id = ${id}`;
    const result = await sequelize.query(sql);
    return res.json({result});
  } catch (error) {
    console.log(error);
  }
}

const createEquipment = async (req, res) => {
  try {
    const { name, category, description, locationId } = req.body;
    const sql = `INSERT INTO magneticswitches VALUES('${name}', '${category}', NULL, NULL, '${description}', '${locationId}')`;
    const result = await sequelize.query(sql);
    return res.json({result});
  } catch (error) {
    console.log(error);
  }
}

const deleteEquipment = async (payload) => {
  try {
    const { id } = payload;
    const sql = `DELETE FROM magneticswitches WHERE id = ${id}`;
    const result = await sequelize.query(sql);
    return res.json({result});
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getEquipmentByWarehouseId: getEquipmentByWarehouseId,
  updateEquipmentState: updateEquipmentState,
  updateEquipmentInfo: updateEquipmentInfo,
  createEquipment: createEquipment,
  deleteEquipment: deleteEquipment,
}