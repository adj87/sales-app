const faker = require("faker");
escape_quotes = require("escape-quotes");

exports.seed = function (knex, Promise) {
  let customers = [];
  const numberOfRegisters = 1000;
  for (var i = 0; i < numberOfRegisters; i++) {
    customers.push({
      id: String(i + 1),
      name: escape_quotes(faker.name.findName()),
      address: escape_quotes(faker.address.streetName()),
      fiscal_id: faker.random.number().toString(),
      route_id: ["1a", "2a", "3b"][Math.floor(Math.random() * 3)],
      zip_code: faker.address.zipCode(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      is_green_point: faker.random.boolean(),
      agent_id: "017",
      is_surcharge: faker.random.boolean(),
      created_at: faker.date.past(),
      updated_at: faker.date.soon(),
      town: faker.address.city(),
      province: faker.address.county(),
      method_of_payment: ["CO", "30", "60"][Math.floor(Math.random() * 3)],
    });
  }
  customers.push({
    id: 1001,
    name: "REPARTO",
    address: escape_quotes(faker.address.city()),
    fiscal_id: faker.random.number().toString(),
    route_id: faker.random.number().toString(),
    zip_code: faker.address.zipCode(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    is_green_point: faker.random.boolean(),
    is_surcharge: faker.random.boolean(),
    created_at: faker.date.past(),
    updated_at: faker.date.soon(),
  });
  return knex("customers").insert(customers);
};
