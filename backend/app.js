const express = require("express");
const db = require("./data/database");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

try {
  app.get("/getAuthors", async function (req, res) {
    db.connectToDatabase();
    var authorArray = [];
    authorArray = await db.getDb().collection("authors").find().toArray();
    console.log(JSON.stringify(authorArray));
    res.send(authorArray);
    // res.render('create', { authorArray: authorArray });
  });
} catch (e) {
  console.log(e);
}

// try {
//   app.post("/discover", async function(req, res){
//     const authorName = (req.body.value);
//     console.log(authorName);
//     const author = await db.getDb().collection('authors'.findOne({ _author: authorName}))
//     console.log(author);
//    const authorChosen = {
//     author: req.body.author
//    };

//    const result = await db.getDb().collection('chosenAuthors'.insertOne(authorChosen));
//    console.log(result);
//    res.redirect('/discover');

//   })
// } catch (e) {
//   console.log(e);
// }

app.get("/", function (req, res) {
  res.send("Home");
});

app.listen(3003);
