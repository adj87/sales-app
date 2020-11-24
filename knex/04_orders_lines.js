/* const faker = require("faker");
const utils = require("../../utils");
escape_quotes = require("escape-quotes");
exports.seed = function (knex, Promise) {
  let ordersLines = [];
  const numberOfOrdersLines = 5000;

  return knex("customers").then((customers) => {
    return knex("products").then((products) => {
      for (var i = 0; i < numberOfOrdersLines; i++) {
        const randomCustomer = utils.getRandomItemOfArray(customers);
        orders.push({
          id: i + 1,
          customer_id: randomCustomer.id,
          customer_name: randomCustomer.name,
          address: randomCustomer.address,
          fiscal_id: randomCustomer.fiscal_id,
          zip_code: randomCustomer.zip_code,
          date: faker.date.past(),
          delivery_date: faker.date.soon(),
        });
      }
      return knex("orders_lines").insert(ordersLines);
    });
  });
};
 */
