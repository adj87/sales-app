const knexfile = require("../knexfile");
const knexConnection = require("knex")(knexfile.development);

module.exports = knexConnection;
