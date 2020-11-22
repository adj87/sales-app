const faker = require('faker');
escape_quotes = require('escape-quotes');

exports.seed = function(knex, Promise) {
  let talleres = [];
  const numberOfRegisters = 150;
  for (var i = 0; i < numberOfRegisters; i++) {
    talleres.push({
      nombre: escape_quotes(faker.name.findName()),
      poblacion: escape_quotes(faker.address.city()),
      provincia: escape_quotes(faker.address.city()),
      cp: faker.address.zipCode(),
      cif: faker.random.number().toString(),
      email: faker.internet.email(),
      telefono: faker.phone.phoneNumber(),
      created_at: knex.fn.now(),
      updated_at: knex.fn.now()
    });
  }
  return knex('talleres').insert(talleres);
};
