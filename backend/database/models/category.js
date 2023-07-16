const sequelize = require('../database');
const { DataTypes } = require("sequelize");

const Category = sequelize.define("category", {
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.TEXT,
    image: DataTypes.TEXT,
});

module.exports = Category;