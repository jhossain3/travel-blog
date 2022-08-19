const express = require("express");
const db = require("./data/database");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


  app.get("/getAuthors", async function (req, res) {
    try{
          console.log("hi");
    db.connectToDatabase();
    var authorArray = [];
    authorArray = await db.getDb().collection("authors").find().toArray();
    console.log(JSON.stringify(authorArray));
    res.send(authorArray);
    
    }
    catch(e){
      console.log(e);
    }

    // res.render('create', { authorArray: authorArray });
  });


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
  res.send("Home2");
  console.log(db.connectToDatabase());
});

app.listen(3003);
