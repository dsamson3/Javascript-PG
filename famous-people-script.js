const pg = require('pg');
const inputData = process.argv.slice(2).join('');
const settings = require('./settings')

const client = new pg.Client({
    user :settings.user,
    password :settings.password,
    database : settings.database,
    host :settings.hostname,
    port :settings.port,
    ssl :settings.ssl
});

const findActor = function(result) {
    console.log(`Found ${result.rows.length} Actor(s) by the name ${inputData}`);
};

const displayActor = function(result){
    result.rows.forEach((result) => {
        console.log(`${result.id}: ${result.first_name} ${result.last_name}, DOB ${result.birthdate.toString().substring(4, 15)}`)
    });
};


client.connect((err) => {
    if(err){
        return console.error("Connection Error", err);
    }
    client.query(`SELECT * FROM famouse_people WHERE (first_name = $1::text OR last_name = $1::text)`,[inputData], (err, result) => {
        if (err){
            return console.error('Error Running Query', err);
        }
        findActor(result);
        displayActor(result);
        client.end();
        
    });
});