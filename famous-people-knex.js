const inputData = process.argv.slice(2).join('');
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

const findActor = function(result) {
    console.log(`Found ${result.length} Actor(s) by the name ${inputData}`);
};

const displayActor = function(result){
    result.forEach((result) => {
        console.log(`${result.id}: ${result.first_name} ${result.last_name}, DOB ${result.birthdate.toString().substring(4, 15)}`)
    });
};


knex.select().from('famouse_people').asCallback((err, result) => {
    if(err){
        return console.error("Connection Error", err);
    }
    knex.select().from('famouse_people').where(function(){
        this.where('first_name', inputData).orWhere('last_name', inputData)}).asCallback((err, result)=>{
            if (err){
                return console.error('Error Running Query', err);
        }
        findActor(result);
        displayActor(result);
    }).then(()=>{
        knex.destroy();
        
    });
});