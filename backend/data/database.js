const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;
async function connect() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("travelblug");
}

function getDb(){
    if(!database){
        throw { message: " db connection not established"};
    }
    return database;
}

module.exports = {
    connectToDatabase:connect, 
    getDb,
    
}