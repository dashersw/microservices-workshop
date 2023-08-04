const express = require("express");
const bodyParser = require("body-parser");
const cote = require("cote");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const restaurantsRequester = new cote.Requester({ name: "restaurants requester", key: "restaurants" });

const orderRequester = new cote.Requester({ name: "order requester", key: "orders" });

const deliveryRequester = new cote.Requester({ name: "delivery requester", key: "deliveries" });

app.get("/restaurants", async (req, res) => {
  const restaurants = await restaurantsRequester.send({ type: "list" });
  res.send(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const restaurant = await restaurantsRequester.send({ type: "restourantById", id: req.params.id });
  res.send(restaurant);
});

app.post("/order", async (req, res) => {
  const order = await orderRequester.send({ type: "create order", order: req.body });
  const delivery = await deliveryRequester.send({ type: "create delivery", order });

  res.send({ order, delivery });
});

app.get("/orders", async (req, res) => {
  const orders = await orderRequester.send({ type: "list" });
  res.send(orders);
});

app.listen(3000, () => console.log("listening"));
