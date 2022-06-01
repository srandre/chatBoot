const dbConfig = require("../config/dbConfig.js");
var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename)
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

global.sequelize = sequelize;
global.Sequelize = Sequelize;
global.Op = Sequelize.Op;
global.db = require('../models')

const db = {};
fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
})

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate)
        db[modelName].associate(db);
})

module.exports = db;