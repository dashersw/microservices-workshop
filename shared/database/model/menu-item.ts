import { DataTypes } from "sequelize";
import sequelize from "../pgdb";
import { Restaurant } from "./restaurant";
export const MenuItem = sequelize.define('MenuItem',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {timestamps: false});

