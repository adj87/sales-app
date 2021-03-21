const faker = require("faker");
escape_quotes = require("escape-quotes");

exports.seed = function (knex, Promise) {
  let products = [];
  const numberOfRegisters = 60;
  for (var i = 0; i < numberOfRegisters; i++) {
    const capacityAndWeight = Math.random() * 2;
    const palletBoxes = faker.random.number(40) + 1;
    const unitsPerBox = faker.random.number(19) + 1;

    const boxCapacity = unitsPerBox * capacityAndWeight;
    const boxWeight = unitsPerBox * capacityAndWeight;

    const palletBase = faker.random.number(10) + 1;
    const palletCapacity = palletBoxes * boxCapacity;
    const boxHeight = faker.random.number(3) + 1;
    const palletWeight = palletBoxes * boxWeight;
    const palletHeight = (palletBoxes / palletBase) * boxHeight;

    products.push({
      id: String(i + 1),
      name: `Producto ${i}`,
      cost: 0.12,
      green_point_amount: (faker.random.number(20) + 1) / 100,
      code_bar: String(
        faker.random.number({ min: 84131340000000, max: 84131349999999 })
      ),
      units_per_box: unitsPerBox,
      capacity: capacityAndWeight,
      weight: capacityAndWeight,

      box_width: faker.random.number(3) + 1,
      box_height: boxHeight,
      box_length: faker.random.number(3) + 1,
      box_weight: boxWeight,
      box_capacity: boxCapacity,
      pallet_boxes: palletBoxes,
      pallet_base: palletBase,
      pallet_weight: palletWeight,
      pallet_capacity: palletCapacity,
      pallet_height: palletHeight,
      is_deprecated: faker.random.boolean(),
    });
  }

  return knex("products").insert(products);
};
