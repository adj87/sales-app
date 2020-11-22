exports.seed = function(knex, Promise) {
  return knex('users').insert({
    name: 'mr_jaurewi',
    password: '1234',
    img_url: 'alberto.jpg'
  });
};
