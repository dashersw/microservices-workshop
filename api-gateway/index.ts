import express, { NextFunction, Request, Response } from 'express'
import cote from 'cote'
import { CustomRequest, authenticateJWT, createAuthToken } from '../shared/middlewares/auth.middleware'
import {  check, validationResult } from 'express-validator'

const app = express()

app.use(express.json());

const restaurantsRequester = new cote.Requester({ name: 'restaurants requester', key: 'restaurants' })

const orderRequester = new cote.Requester({ name: 'order requester', key: 'orders' })

const deliveryRequester = new cote.Requester({ name: 'delivery requester', key: 'deliveries' })

const checkErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
}

app.get('/restaurants', async (req:Request, res:Response) => {
    const restaurants = await restaurantsRequester.send({ type: 'list' })
    res.send(restaurants);
})

app.post('/order', authenticateJWT, [
    check("restaurantId").isInt({min: 1}).withMessage("Restaurant Id is mandatory and should be greater than 0"),
    check("orderItems").isArray().notEmpty().withMessage("Order items are mandatory"),
    check("orderItems.*.itemId").isInt({min: 1}).withMessage("Item id is mandatory and should be greater than 0"),
    check("orderItems.*.quantity").isInt({min: 1}).withMessage("Quantity is mandatory and should be greater than 0"),
],checkErrors , async (req:Request, res:Response) => {

    const {userId} = (req as CustomRequest).payload as {userId: number};
    const order = await orderRequester.send({ type: 'create order', order: req.body, userId:  userId});
    const delivery = await deliveryRequester.send({ type: 'create delivery', order })
    res.send({ order, delivery })
})

app.get('/my-orders', authenticateJWT, async(req: Request, res: Response) => {
    const {userId} = (req as CustomRequest).payload as {userId: number};
    const orders = await orderRequester.send({type: 'find orders', userId});
    res.send(orders)
});


app.post('/login', [
    check("username").notEmpty().withMessage("Username is mandatory"),
    check("password").notEmpty().withMessage("Password is mandatory")
],checkErrors, async( req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await restaurantsRequester.send({type: 'customer login', credentials: {username, password}});
    res.send({
        token
    });
})


app.listen(3000, () => console.log('listening'))
