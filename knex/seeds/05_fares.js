const faker = require("faker");
const dayjs = require("dayjs");
const utils = require("../../utils");
escape_quotes = require("escape-quotes");
exports.seed = function (knex, Promise) {
  const fares = [];
  return knex("customers").then((customers) => {
    return knex("products").then((products) => {
      customers.forEach((customer) => {
        const isCustomerIncludedInList = [1, 2, 3, 4, 5, 6, 90].includes(
          customer.id
        );
        if (isCustomerIncludedInList) {
          //CREATE A RANDOM LIST OF DIFFERENT FARES ONLY FOR A FEW CUSTOMERS AND NOT FOR ALL, NOT TO COLLAPSE THE TABLE
          for (var i = 0; i < 3; i++) {
            const randomProduct = utils.getRandomItemOfArray(products);
            fares.push({
              customer_id: customer.id,
              customer_name: customer.name,
              product_id: randomProduct.id,
              price_1: faker.random.number(3),
              price_2: faker.random.number(3),
              price_3: faker.random.number(3),
              price_4: faker.random.number(3),
              to_sell: 6,
              to_charge: 5,
            });
          }
        }
      });
      return knex("fares").insert(fares);
    });
  });
};
