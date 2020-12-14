const faker = require("faker");
escape_quotes = require("escape-quotes");

exports.seed = function (knex, Promise) {
  let customers = [];
  const numberOfRegisters = 60;
  for (var i = 0; i < numberOfRegisters; i++) {
    customers.push({
      id: i + 1,
      name: escape_quotes(faker.name.findName()),
      address: escape_quotes(faker.address.city()),
      fiscal_id: faker.random.number().toString(),
      zip_code: faker.address.zipCode(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      green_point: faker.random.boolean(),
      surcharge: faker.random.boolean(),
      created_at: faker.date.past(),
      updated_at: faker.date.soon(),
    });
  }
  return knex("customers").insert(customers);
};
