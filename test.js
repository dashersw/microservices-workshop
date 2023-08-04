const axios = require("axios");

async function main() {
  // all restourants
  const restaurants = await axios.get("http://localhost:3000/restaurants");
  console.log(restaurants.data, "restaurants");

  // restourant by id
  const restaurant = await axios.get("http://localhost:3000/restaurants/1");
  console.log(restaurant.data, "restaurant");

  // create new order
  const orderRequest = {
    restaurantId: 1,
    menuId: 1,
    address: "Wall Street 3, 68443",
  };

  const order = await axios.post("http://localhost:3000/order", orderRequest);
  console.log(order.data, "order");

  // all orders
  const orders = await axios.get("http://localhost:3000/orders");
  console.log(orders.data, "orders");
}

main();
