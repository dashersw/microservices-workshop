import { DataTypes } from "sequelize";
import sequelize from "../pgdb";
import { OrderItem } from "./order-item";
import { User } from "./user";
import { Restaurant } from "./restaurant";

const Order = sequelize.define('Order',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {timestamps: false});
const items = Order.hasMany(OrderItem, { as: 'items'})
const customer = Order.belongsTo(User, {as: 'customer'})
const restaurant = Order.belongsTo(Restaurant, {as: 'restaurant'})
export {Order, items, customer, restaurant};