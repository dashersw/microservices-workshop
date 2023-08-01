import { DataTypes } from "sequelize";
import sequelize from "../pgdb";
import { Order } from "./order";

const DeliveryItem = sequelize.define('DeliveryItem', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrementIdentity: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['pending', 'completed', 'cancelled']
    }
})

export {DeliveryItem};