const faker = require('faker');
escape_quotes = require('escape-quotes');
exports.seed = function(knex, Promise) {
  let informes = [];
  const numberOfRegisters = 100;
  for (var i = 0; i < numberOfRegisters; i++) {
    informes.push({
      nombre: escape_quotes(faker.commerce.product()),
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      taller_id: faker.random.arrayElement([1, 2, 3, 4, 5])
    });
  }
  return knex('informes').insert(informes);
};
