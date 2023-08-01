import { DataTypes } from "sequelize";
import sequelize from "../pgdb";
import { MenuItem } from "./menu-item";

const OrderItem = sequelize.define('OrderItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {timestamps: false});

const menuItem = OrderItem.belongsTo(MenuItem, {as: 'menuItem'});
export {OrderItem, menuItem};