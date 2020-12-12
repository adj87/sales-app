escape_quotes = require("escape-quotes");

exports.seed = function (knex, Promise) {
  let products = [];
  const numberOfRegisters = 60;
  for (var i = 0; i < numberOfRegisters; i++) {
    products.push({
      id: i + 1,
      name: `Producto ${i}`,
      cost: 0.12,
      green_point_amount: 0.0125,
      units_per_box: 12,
      capacity: 2,
    });
  }

  return knex("products").insert(products);
};
