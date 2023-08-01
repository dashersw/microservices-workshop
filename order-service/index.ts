import cote from 'cote'
import { Order, customer, items, restaurant } from '../shared/database/model/order'
import { Op } from 'sequelize'
import { seedData } from '../shared/database/seed-data/seed'
import { OrderResponseItem, OrderedItem } from './dtos/order-response';
import { MenuItem } from '../shared/database/model/menu-item';
import { menuItem } from '../shared/database/model/order-item';

seedData().then(() => {
    console.log("Seeding success!")
});

const orderResponder = new cote.Responder({ name: 'order responder', key: 'orders' })
orderResponder.on('*', (req: any) => req.type && console.log(req))

const orders = []
let idCounter = 0

orderResponder.on('create order old', async (req: any) => {
    const order = { id: idCounter++, ...req.order, status: 'preparing' }
    orders.push(order)
    return Promise.resolve(order)
})

orderResponder.on('create order', async (req: any) => {
    const order = req.order;
    const customerId = req.userId;
    const restaurantId = order.restaurantId;
    const orderItems: any[] = order.orderItems ;
    const menuitemIds = orderItems.map(oi => oi.itemId as number );
    const requestedItems = (await MenuItem.findAll({
        where: {
            restaurantId: {
                [Op.eq] : restaurantId
            },
            id: {
                [Op.in] : menuitemIds
            }
        }
    })).map(item => {
        return {
            menuItemId: item.dataValues.id,
            quantity: orderItems.find(oi => oi.itemId === item.dataValues.id)?.quantity,
            price: item.dataValues.price as number
        };
    });
    const total = requestedItems.map(ri => ri.price * ri.quantity).reduce((acc, val) => acc + val);
    try{
        const count = await Order.count();
        const newOrder = {
            restaurantId,
            orderId: "OD00"+(count  + 1),
            customerId,
            items: requestedItems,
            total: total
        }
        const createdOrder = await Order.create(newOrder, {
            include: [customer, restaurant, {
                association: items,
                include: [menuItem],
            }],
        });
        const _order = await Order.findByPk(createdOrder.dataValues.id, {include: [customer, restaurant, {
            association: items,
            include: [{
                association: menuItem,
                as: 'menuItem' 
            }]
        }]})
        const response = mapOrdersToResponse([_order])[0];
        return Promise.resolve(response)
    }
    catch(error) {
        console.error(error)
    }

})

orderResponder.on('find orders', async (req: any) => {
    const { userId } = req;
    const orders = await Order.findAll({
        where: {
            customerId: {
                [Op.eq]: userId
            }
        },
        include: [customer, restaurant, {
            association: items,
            include: [{
                association: menuItem,
                as: 'menuItem' 
            }]
        }],
        nest: true
    });
    const response = mapOrdersToResponse(orders);
    return Promise.resolve(response)
})

const mapOrdersToResponse = (orders: any[]) => {
    const response: OrderResponseItem[] = orders.map(order => {
        return {
            orderId: order.dataValues.orderId,
            total: order.dataValues.total,
            items: (order.dataValues.items as any[]).map(oi => {
                return {
                    name: oi.menuItem.name,
                    price: oi.menuItem.price,
                    quantity: oi.quantity
                } as OrderedItem;
            })
        } as OrderResponseItem;
    });
    return response;
}