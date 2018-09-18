
exports.up = function(knex, Promise) {
   return knex.schema.alterTable('milestones', function (table) {
        table.integer('famouse_person_id')
        .references('id').inTable('famouse_people');
})
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('milestones', function(table){
        table.dropColumn('famouse_person_id');
})
};
