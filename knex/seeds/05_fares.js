const faker = require("faker");
const dayjs = require("dayjs");
const utils = require("../../utils");
escape_quotes = require("escape-quotes");
exports.seed = function (knex, Promise) {
  const fares = [];
  return knex("customers").then((customers) => {
    return knex("products").then((products) => {
      customers.forEach((customer) => {
        const isCustomerIncludedInList = [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "90",
        ].includes(customer.id);
        if (isCustomerIncludedInList) {
          //CREATE A RANDOM LIST OF DIFFERENT FARES ONLY FOR A FEW CUSTOMERS AND NOT FOR AL"L", NOT TO COLLAPSE THE TABLE
          for (var i = 0; i < 3; i++) {
            const randomProduct = utils.getRandomItemOfArray(products);
            fares.push({
              customer_id: customer.id,
              customer_name: customer.name,
              product_id: randomProduct.id,
              product_name: randomProduct.name,
              price_1: faker.random.number(3) + 1,
              price_2: faker.random.number(3) + 1,
              price_3: faker.random.number(3) + 1,
              price_4: faker.random.number(3) + 1,
              to_sell: 6,
              to_charge: 5,
            });
          }
        }
      });
      products.forEach((el) => {
        fares.push({
          customer_id: "1001",
          customer_name: "REPARTO",
          product_id: el.id,
          product_name: el.name,
          price_1: Math.round(Math.random() * 2 * 100) / 100,
          price_2: faker.random.number(3) + 1,
          price_3: faker.random.number(3) + 1,
          price_4: faker.random.number(3) + 1,
          to_sell: 6,
          to_charge: 5,
        });
      });

      return knex("fares").insert(fares);
    });
  });
};
