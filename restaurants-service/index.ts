import cote, { Requester } from 'cote';
import { Restaurant, menuItems } from '../shared//database/model/restaurant';
import { User } from '../shared/database/model/user';
import { Op } from 'sequelize';
import { createAuthToken } from '../shared/middlewares/auth.middleware';
import { seedData } from '../shared/database/seed-data/seed';

seedData().then(() => {
    console.log("Seeding success!")
});

const restaurantsResponder = new cote.Responder({ name: 'restaurants responder', key: 'restaurants' })
restaurantsResponder.on('*', (req: any) => req.type && console.log(req))

const getRestaurantsFromDb = async () => {
    try {
        const result = await Restaurant.findAll({ include: ["menu"] });    
        return result;
    }
    catch (error) {
        console.log(error)
    }
}

const login = async (req: any) => {
    const {username, password} = req.credentials;
    const user = await User.findOne({
        where: {
            username: {
                [Op.eq]: username
            },
            password: {
                [Op.eq]: password
            }
        }
    });
    if(user){
        const {id} = user.dataValues;
        const token = createAuthToken(id);
        return Promise.resolve(token);
    }

}

restaurantsResponder.on('list', (req: any) => getRestaurantsFromDb())

restaurantsResponder.on('customer login', (req: any) => login(req))
