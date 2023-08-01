import cote from 'cote'
import { seedData } from '../shared/database/seed-data/seed';
import { DeliveryItem } from '../shared/database/model/delivery-item';

seedData().then(() => {
    console.log("Seeding success!")
});

const deliveryResponder = new cote.Responder({ name: 'delivery responder', key: 'deliveries' })
deliveryResponder.on('*', (req: any) => req.type && console.log(req))

deliveryResponder.on('create delivery', async (req:any ) => {
    const orderId = req.order.orderId;
    try{
        const newDelivery = await DeliveryItem.create({
            orderId,
            eta: 60,
            status:'pending'
        })
        const delivery = { eta: newDelivery.dataValues.eta, status:newDelivery.dataValues.status }
        return Promise.resolve(delivery)
    }
    catch(error) {
        console.error(error);
    }
})