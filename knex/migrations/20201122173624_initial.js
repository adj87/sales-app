exports.up = function (knex) {
  return (
    knex.schema

      /**
       * For customers
       */
      .createTable("customers", function (table) {
        table.string("id").primary();
        table.string("name").notNullable();
        table.string("address").notNullable();
        table.string("fiscal_id").notNullable();
        table.string("route_id").notNullable();
        table.string("zip_code").notNullable();
        table.string("email");
        table.string("phone");
        table.string("agent_id");
        table.boolean("is_green_point").defaultTo(true);
        table.boolean("is_surcharge").defaultTo(false);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.boolean("is_deprecated").defaultTo(true);
        table.string("town");
        table.string("province");
        table.string("method_of_payment");
      })

      /**
       * For products
       */

      .createTable("products", function (table) {
        table.string("id").primary();
        table.string("code_bar").notNullable();
        table.string("name").notNullable();
        table.integer("cost").notNullable();
        table.float("green_point_amount").notNullable();
        table.integer("units_per_box").notNullable();
        table.float("capacity");
        table.float("weight");
        table.boolean("is_deprecated");

        table.float("box_width");
        table.float("box_height");
        table.float("box_length");
        table.float("box_weight");
        table.float("box_capacity");

        table.integer("pallet_boxes");
        table.integer("pallet_base");
        table.float("pallet_weight");
        table.float("pallet_capacity");
        table.float("pallet_height");
      })

      /**
       * For Fares
       */

      .createTable("fares", function (table) {
        table
          .string("product_id")
          .references("id")
          .inTable("products")
          .onDelete("CASCADE");
        table
          .string("customer_id")
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

      /**
       * For Orders
       */

      .createTable("orders", function (table) {
        table.increments("id");
        table.string("address").notNullable();
        table.string("shipping_place");
        table.string("fiscal_id").notNullable();
        table.string("route_id").notNullable();
        table.string("zip_code").notNullable();
        table.date("date");
        table.date("delivery_date");
        table.float("total_net");
        table.float("total_surcharge");
        table.float("total_taxes");
        table.float("total");
        table.string("province");
        table.string("town");
        table.boolean("is_surcharge").defaultTo(false);
        table
          .string("customer_id")

          .references("id")
          .inTable("customers")
          .onDelete("CASCADE");
        table.string("customer_name");
        table.boolean("is_green_point").notNullable();
        table.enu("type", ["A", "B", "C"]).defaultTo("A");
        table.boolean("show_together_with_others").defaultTo(false);
      })

      /**
       * For order lines
       */

      .createTable("order_lines", function (table) {
        table.integer("order_id");
        table.enu("order_type", ["A", "B", "C"]).defaultTo("A");
        table.integer("line_number");
        table
          .string("product_id")
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
        table.integer("pallet_boxes");
        table.float("surcharge_amount");
        table.float("green_point_amount");
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("fares")
    .dropTable("order_lines")
    .dropTable("orders")
    .dropTable("products")
    .dropTable("customers");
};
