// Update with your config settings.
const path = require("path");
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "",
      database: "sales-app",
    },
    migrations: {
      directory: path.join(__dirname, "sql/knex/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "sql/knex/seeds"),
    },
  },
  /*   production: {
    client: 'mysql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  } */
};
