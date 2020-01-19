const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb://localhost:27017/mydb';

let mongodb;

function connect(callback){
    if(!mongodb){
        mongoClient.connect(mongoDbUrl, (err, db) => {
            mongodb = db;
            if(callback){
                callback();
            }
        });
    }

    return mongodb
}

function close(){
    mongodb.close();
}

module.exports = {
    connect
}