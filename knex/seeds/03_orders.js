const faker = require("faker");
escape_quotes = require("escape-quotes");
exports.seed = function (knex, Promise) {
  let orders = [];
  const numberOfRegisters = 1;

  return knex("customers").then((customers) => {
    const customersLength = customers.length;

    for (var i = 0; i < numberOfRegisters; i++) {
      const randomNumber = Math.floor(Math.random() * customersLength);
      const randomCustomer = customers[randomNumber];
      orders.push({
        id: i + 1,
        customer_id: randomCustomer.id,
        customer_name: randomCustomer.name,
        address: randomCustomer.address,
        fiscal_id: randomCustomer.fiscal_id,
        zip_code: randomCustomer.zip_code,
        date: faker.date.past(),
        delivery_date: faker.date.soon(),
        total_net: 5 * i,
        total_taxes: 5 * i * 0.21,
        total: 5 * i * 1.21,
        surcharge: faker.random.boolean(),
        green_point: randomCustomer.green_point,
        customer_route_id: faker.random.number(6),
        type: faker.random.arrayElements[("A", "B")],
      });
    }
    return knex("orders").insert(orders);
  });
};
