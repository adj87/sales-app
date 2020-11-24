escape_quotes = require("escape-quotes");

exports.seed = function (knex, Promise) {
  let products = [
    {
      id: 1,
      name: "Lejía El Arroyo 2L",
      cost: 0.12,
      units_per_box: 12,
      capacity: 2,
    },
    {
      id: 2,
      name: "Fregasuelos El arroyo Limon 1.5L",
      cost: 0.25,
      units_per_box: 15,
      capacity: 1.5,
    },
    {
      id: 3,
      name: "MultiUsos Mi Hada 1.5L",
      cost: 0.25,
      units_per_box: 15,
      capacity: 1.5,
    },
  ];

  return knex("products").insert(products);
};
