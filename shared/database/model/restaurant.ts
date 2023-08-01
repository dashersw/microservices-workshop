import { Sequelize, Model, DataTypes } from "sequelize";
import sequelize from "../pgdb";
import {MenuItem} from "./menu-item";

const Restaurant = sequelize.define('Restaurant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {timestamps: false});
const menuItems = Restaurant.hasMany(MenuItem, {as: 'menu'});
export {Restaurant, menuItems};