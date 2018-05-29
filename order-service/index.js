const cote = require('cote')

const orderResponder = new cote.Responder({ name: 'order responder', key: 'orders' })
orderResponder.on('*', req => req.type && console.log(req))

const orders = []
let idCounter = 0

orderResponder.on('create order', req => {
    const order = { id: idCounter++, ...req.order, status: 'preparing' }

    orders.push(order)
    return Promise.resolve(order)
})
