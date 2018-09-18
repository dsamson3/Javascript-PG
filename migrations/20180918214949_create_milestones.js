
exports.up = function(knex, Promise) {
  return knex.schema.createTable('milestones', function(table){
      table.increments();
      table.string("description",255);
      table.date('date_acheived');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones');
};
