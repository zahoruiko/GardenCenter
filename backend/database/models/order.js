const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      },
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      },
    },
    orderStatus: DataTypes.NUMBER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    timestamps: false,
  }
);

module.exports = Order;
