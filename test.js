const axios = require('axios')

axios.get('http://localhost:3000/restaurants').then(res => console.log(res.data))

axios.post('http://localhost:3000/order', {restaurantId: 1, menuId: 1, address: 'Wall Street 3, 68443'}).then(res => console.log(res.data))
