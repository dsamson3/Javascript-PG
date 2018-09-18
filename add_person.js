const settings = require('./settings')

const knex = require('knex')({
    client: 'pg',
    connection: {
    host :settings.hostname,
    user :settings.user,
    password :settings.password,
    database : settings.database,
    }
});

knex.insert({
    first_name: process.argv.slice(2)[0],
    last_name: process.argv.slice(2)[1],
    birthdate: process.argv.slice(2)[2]
}).into('famouse_people').then(() =>{
    console.log(`New Database Entry`)
}).finally(()=>{
    knex.destroy();
});