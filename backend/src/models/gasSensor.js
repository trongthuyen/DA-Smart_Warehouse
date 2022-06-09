'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GasSensor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    GasSensor.init({
        name: DataTypes.STRING,
        danger: DataTypes.STRING,
        locationId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'GasSensor',
    });
    return GasSensor;
};