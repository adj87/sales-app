const faker = require("faker");
const utils = require("../../utils");
escape_quotes = require("escape-quotes");
exports.seed = function (knex, Promise) {
  const numberOfOrdersLines = 3;

  return knex("orders").then((orders) => {
    return knex("products").then((products) => {
      orders.forEach((order) => {
        for (var i = 0; i < numberOfOrdersLines; i++) {
          const randomProduct = utils.getRandomItemOfArray(products);
          const price = faker.random.float(2);
          const cost = faker.random.float(price);
          const units_per_box = randomProduct.units_per_box;
          const quantity = faker.random.number(20);
          const orderLine = {
            order_id: order.id,
            order_type: order.type,
            line_number: i + 1,
            product_id: randomProduct.id,
            product_name: randomProduct.name,
            units_per_box,
            price,
            cost,
            quantity,
            taxes_rate: order.type === "A" ? 21 : 0,
            surcharge_amount: order.surcharge ? 0.052 * price : 0,
            green_point_amount: order.green_point
              ? randomProduct.green_point_amount
              : 0,
          };
          console.log(`${i}-${JSON.stringify(orderLine)}`);
          return knex("orders_lines").insert(orderLine);
        }
      });
    });
  });
};
