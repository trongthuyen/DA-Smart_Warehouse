'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MagneticSwitch extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    MagneticSwitch.init({
        name: DataTypes.STRING,
        category: DataTypes.ENUM('Door', 'Cooler', 'Light'),
        temp: DataTypes.STRING,
        state: DataTypes.BOOLEAN,
        description: DataTypes.STRING,
        locationId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'MagneticSwitch',
    });
    return MagneticSwitch;
};