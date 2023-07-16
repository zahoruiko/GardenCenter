const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: DataTypes.TEXT,
  price: DataTypes.DOUBLE,
  discont_price: DataTypes.DOUBLE,
  description: DataTypes.TEXT,
  categoryId: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  image: DataTypes.TEXT,
  discount_prozent: {
    type: DataTypes.VIRTUAL,
    get() {
      return (1 - this.discont_price / this.price) * 100;
    },
  },
});

module.exports = Product;
