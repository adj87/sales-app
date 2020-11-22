var knex = require('knex');
var environment = process.env.NODE_ENV || 'development';
var config = require('../../knexfile')[environment];
module.exports = knex(config);
