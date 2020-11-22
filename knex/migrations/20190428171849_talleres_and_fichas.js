exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('talleres', function(table) {
      table.increments('id');
      table.string('nombre').notNullable();
      table.string('poblacion').notNullable();
      table.string('provincia').notNullable();
      table.string('cp').notNullable();
      table.string('cif').notNullable();
      table.string('email').notNullable();
      table.string('telefono').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('informes', function(table) {
      table.increments('id');
      table.string('nombre');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table
        .integer('taller_id')
        .unsigned()
        .references('id')
        .inTable('talleres');
    })
    .createTable('files', function(table) {
      table.string('id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table
        .integer('informe_id')
        .unsigned()
        .references('id')
        .inTable('informes');
    })
    .createTable('users', table => {
      table.increments('id');
      table.string('name');
      table.string('password');
      table.string('img_url');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('files')
    .dropTable('informes')
    .dropTable('talleres')
    .dropTable('users');
};
