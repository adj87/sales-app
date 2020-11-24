exports.up = function (knex) {
  return knex.schema
    .createTable("customers", function (table) {
      table.increments("id");
      table.string("name").notNullable();
      table.string("address").notNullable();
      table.string("fiscal_id").notNullable();
      table.string("zip_code").notNullable();
      table.string("email");
      table.string("phone");
      table.boolean("green_point").defaultTo(true);
      table.boolean("surcharge").defaultTo(true);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("products", function (table) {
      table.increments("id");
      table.string("name").notNullable();
      table.integer("cost").notNullable();
      table.integer("units_per_box").notNullable();
      table.float("capacity");
    })

    .createTable("fares", function (table) {
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table
        .integer("customer_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.string("price_1");
      table.string("price_2");
      table.string("price_3");
      table.string("price_4");
      table.integer("to_sell");
      table.integer("to_charge");
      table.integer("green_point_amount").defaultTo(0);
    })

    .createTable("orders", function (table) {
      table.increments("id");
      table.string("customer_name");
      table.string("address").notNullable();
      table.string("fiscal_id").notNullable();
      table.string("zip_code").notNullable();
      table.string("date").notNullable();
      table.string("delivery_date").notNullable();
      table.float("total_net");
      table.float("total_taxes");
      table.float("total");
      table
        .integer("customer_id")
        .unsigned()
        .references("id")
        .inTable("customers")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("orders")
    .dropTable("customers")
    .dropTable("products")
    .dropTable("fares");
};
