// import {Dropbox} from 'dropbox'

const express = require("express");
const { ObjectId } = require("mongodb");
const Dropbox = require("dropbox").Dropbox;
const fetch = require("isomorphic-fetch");
const db = require("./data/database");
const { createSearchParams } = require("react-router-dom");
const app = express();


const bp = require('body-parser');
const { red } = require("@mui/material/colors");

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const dbx = new Dropbox({
  accessToken : 'sl.BQPf2XtpMYmY3MsBqGpSdjQzy-N4UyfpWqUCcXNWYwRCG3-erTe75B_J0qZ_L4zRPSRXBOxIZnxHxlU-iyX_gL9wPBHISCFFAfw_ZAQrgYWczDP2Y0hnfqUg9DYYMuqYVrDHb9U',
  fetch: fetch
})

app.post("/dbx", (req, res) => {

  console.log('sadiyah smeellssss');
  let imageArray;

//I receive either a single image or an array of images from the front end and
//its placed in req.files by express-fileupload

  if (req.files.itemImage.length) {
    imageArray = [...req.files.itemImage];
  } else {
    imageArray = [req.files.itemImage];
  }

  imageArray.forEach(image => {
  console.log("Image==>>",image)

  dbx
  .filesUpload({
    path: `/${image.name}`,
    contents: image.data
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
});
});

const getPosts = async (req, res) => {
  try {
    console.log("hi");
    db.connectToDatabase();
    var postArray = [];
    postArray = await db
    .getDb()
    .collection("posts")
    .find()
    .toArray();
    console.log(JSON.stringify(postArray));
    const posts = postArray;
    res.send(posts);
    
  } catch (e) {
    console.log(e);
  }
};

const dropBox = async ( req, res) => {


}

const getPostById = async (req, res) => {
  try {
    console.log("hi");
    db.connectToDatabase();
    var postArray = [];
    postArray = await db
    .getDb()
    .collection("posts")
    .find()
    .toArray();
   
    const url = req.params.id;
    
  const post = postArray.filter(p => p._id.toString() === url);
  // post.humanReadableDate = post.dateNow.toLocaleDateString('en-GB',{
  //   weekday:'long',
  //   year:'numeric',
  //   month:'long',
  //   day:'numeric',
  // })

  // post.dateNow.date = post.dateNow.date.toISOString();

  if (post[0]) {
    res.send(post[0]);
    console.log(post[0])
  }
  else{
    console.log('it empty');
  }
  }
  catch(e){
    console.log(e);
  }

};




app.get("/getAuthors", async function (req, res) {
  try {
    console.log("hi world");
    db.connectToDatabase();
    var authorArray = [];
    authorArray = await db.getDb().collection("authors").find().toArray();
    console.log(JSON.stringify(authorArray));
    res.send(authorArray);
  } catch (e) {
    console.log(e);
  }
});

// app.post("/posts", async function (req, res) {
//   try{
//     const postId = new ObjectId(req.body._id);
//     console.log(postId);
//     const result = await db.getDb().collection('posts')
//     .updateOne(
//       { _id: postId },
//     {
//         $set:{
//           destination: req.body.destination,
//           summary: req.body.summary,
//           author: req.body.author,
//           groupSize: req.body.groupSize ,
//           flightHours: req.body.flightHours,
//           checkIn: req.body.checkIn,
//           checkOut: req.body.checkOut,
//         },
//       }
  
//     );
//     res.redirect("/discover")
//   }
//   catch(e){
//     console.log(e);
//   }
// });

app.post("/posts", async function (req, res) {
  try{  
    console.log('this is reqbody', req.body);
    const authorId = ObjectId(req.body.author);
    const author = await db.getDb().collection("authors").findOne({ _id: authorId });
  
    const newPost = {
      destination: req.body.destination,
      groupSize: req.body.groupSize,
      flightHours: req.body.flightHours,
      summary: req.body.summary,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      pictures: req.body.pictures,
      dateNow: new Date(),
      author: {
        id: authorId,
        name: author.name,
        email: author.email,
      },
    };
    const result = await db.getDb().collection('posts').insertOne(newPost);
    console.log(result);

  }
  catch(e){
    console.log(e);
  }


});


app.get("/hello", async function (req, res) {
  try {
    res.send("dinkey");
    
  } catch (e) {
    console.log(e);
  }
});

// app.post("/hello", async function (req, res) {
//   try {
//     res.send("dinkey");
    
//   } catch (e) {
//     console.log(e);
//   }
// });

// app.route('/hello')
//   .get(getDonkey);


// app.route( '/dbx').get(dropBox);


app.route('/posts')
  .get(getPosts);
 

app.route('/posts/:id')
  .get(getPostById);

app.listen(3003);