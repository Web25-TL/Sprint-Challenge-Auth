exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments(); // using increments means no id is required because knex will auto add the id for you

    users
      .string('username', 255).notNullable().unique(); // required in postman 
    users.string('email', 255).unique(); // not required in postman
    users.string('password', 255).notNullable(); // required in postman
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
