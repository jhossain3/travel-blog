const express = require('express');
const db = require('./data/database');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

try{
app.get("/getAuthors", async function(req, res) {
    db.connectToDatabase();
    var authorArray = [];
    authorArray = await db.getDb().collection('authors').find().toArray();
    console.log(JSON.stringify(authorArray))
    res.send((authorArray))
    // res.render('create', { authorArray: authorArray });

});
} catch (e){
    console.log(e);
}



app.get("/", function(req, res) {

res.send("Home ")

});


app.listen(3003);