const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const OrdersContent = sequelize.define(
  "orders_content",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        isInt: true,
        min: 1
      },
    },
    quantity: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: true,
        isDouble: true,
        min: 1
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = OrdersContent;
