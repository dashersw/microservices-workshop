import { DeliveryItem } from "../model/delivery-item";
import { Order, customer, items, restaurant } from "../model/order";
import { Restaurant, menuItems } from "../model/restaurant";
import { User } from "../model/user";
import sequelize from "../pgdb";
import * as data from './data.json'

export const seedData = async () => {
    await sequelize.sync({force: true})
    const {restaurants, users, orders, deliveries} = data;
    if((await Restaurant.count() === 0)){
        for (const rest of restaurants) {
            await Restaurant.create(rest, {
                include: [
                    {
                        association: menuItems,
                        as: 'menu'
                    }
                ]
            });
        }
    }
    if((await User.count() === 0)){
        for (const user of users) {
            await User.create(user);
        }
    }

    if((await Order.count() === 0)){
        for (const order of orders) {
            await Order.create(order, {
                include: [items, customer, restaurant]
            });
        }

        for(const delivery of deliveries) {
            await DeliveryItem.create(delivery)
        }
    }

}
