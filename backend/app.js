const express = require('express');
const db = require('./data/database');

const app = express();


try{
app.get("/getAuthors", function(req, res) {
    db.connectToDatabase();
    var authors = [];
   authors = db.getDb().collection('authors').find({});
    console.log(JSON.stringify(authors))
res.send((authors))

});
} catch (e){
    console.log(e);
}



app.get("/", function(req, res) {

res.send("Home ")

});


app.listen(3003);