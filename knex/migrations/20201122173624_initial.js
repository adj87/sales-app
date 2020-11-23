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

    })

    .createTable("orders", function (table) {
      table.increments("id");
      table.string("customer_name");
      table.string("address").notNullable();
      table.string("fiscal_id").notNullable();
      table.string("zip_code").notNullable();
      table.string("date").notNullable();
      table.string("delivery_date").notNullable();
      table.string("delivery_date").notNullable();
      table.string("delivery_date").notNullable();
      table.string("delivery_date").notNullable();
      table
        .integer("customer_id")
        .unsigned()
        .references("id")
        .inTable("customers").onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("orders").dropTable("customers");
};
