'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Dht11 extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Dht11.init({
        name: DataTypes.STRING,
        temp: DataTypes.STRING,
        humi: DataTypes.STRING,
        locationId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Dht11',
    });
    return Dht11;
};