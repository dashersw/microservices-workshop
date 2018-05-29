const axios = require('axios')

async function main() {
  const restaurants = await axios.get('http://localhost:3000/restaurants')
  console.log(restaurants.data)

  const orderRequest = {
    restaurantId: 1,
    menuId: 1,
    address: 'Wall Street 3, 68443'
  }

  const order = await axios.post('http://localhost:3000/order', orderRequest)
  console.log(order.data)
}

main()
