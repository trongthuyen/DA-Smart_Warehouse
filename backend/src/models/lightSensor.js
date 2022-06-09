'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LightSensor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    LightSensor.init({
        name: DataTypes.STRING,
        intensity: DataTypes.STRING,
        locationId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'LightSensor',
    });
    return LightSensor;
};