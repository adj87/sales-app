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
      table.boolean("is_green_point").defaultTo(true);
      table.boolean("is_surcharge").defaultTo(false);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("products", function (table) {
      table.increments("id");
      table.string("name").notNullable();
      table.integer("cost").notNullable();
      table.float("green_point_amount").notNullable();
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
        .inTable("customers")
        .onDelete("CASCADE");

      table.string("product_name");
      table.string("customer_name");
      table.float("price_1");
      table.float("price_2");
      table.float("price_3");
      table.float("price_4");
      table.integer("to_sell");
      table.integer("to_charge");
      table.integer("green_point_amount").defaultTo(0);
    })

    .createTable("orders", function (table) {
      table.increments("id");
      table.string("address").notNullable();
      table.string("shipping_place");
      table.string("fiscal_id").notNullable();
      table.string("zip_code").notNullable();
      table.date("date");
      table.date("delivery_date");
      table.float("total_net");
      table.float("total_surcharge");
      table.float("total_taxes");
      table.float("total");
      table.boolean("is_surcharge").defaultTo(false);
      table
        .integer("customer_id")
        .unsigned()
        .references("id")
        .inTable("customers")
        .onDelete("CASCADE");
      table.string("customer_name");
      table.boolean("is_green_point").notNullable();
      table.integer("customer_route_id");
      table.enu("type", ["A", "B", "C"]).defaultTo("A");
      table.boolean("show_together_with_others").defaultTo(false);
    })

    .createTable("order_lines", function (table) {
      table.integer("order_id");
      table.enu("order_type", ["A", "B", "C"]).defaultTo("A");
      table.integer("line_number");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.string("product_name");
      table.integer("units_per_box").notNullable();
      table.integer("capacity").notNullable();
      table.float("price");
      table.float("cost");
      table.integer("quantity");
      table.integer("taxes_rate");
      table.float("surcharge_amount");
      table.float("green_point_amount");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("fares")
    .dropTable("order_lines")
    .dropTable("orders")
    .dropTable("products")
    .dropTable("customers");
};
