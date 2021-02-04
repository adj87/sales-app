const faker = require("faker");
escape_quotes = require("escape-quotes");

exports.seed = function (knex, Promise) {
  let products = [];
  const numberOfRegisters = 60;
  for (var i = 0; i < numberOfRegisters; i++) {
    products.push({
      id: i + 1,
      name: `Producto ${i}`,
      cost: 0.12,
      green_point_amount: (faker.random.number(20) + 1) / 100,
      units_per_box: faker.random.number(19) + 1,
      capacity: faker.random.number(3) + 1,
    });
  }

  return knex("products").insert(products);
};
