const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('mvc_DoAn', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to cconnect to db', error)
    }
}

module.exports = connectDB