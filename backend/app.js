// import {Dropbox} from 'dropbox'

const express = require("express");
const { ObjectId } = require("mongodb");
const Dropbox = require("dropbox").Dropbox;
const fetch = require("isomorphic-fetch");
const db = require("./data/database");
const { createSearchParams } = require("react-router-dom");
const app = express();
const multer = require('multer');


const upload = multer({ dest:'./images'});


const bp = require('body-parser');

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


app.post("/posts",upload.single('file'), async function (req, res) {
  try{  
    const authorId = new ObjectId(req.body.author);
    console.log('req.body',req.body);
    console.log('file',req.file);
    const author = await db.getDb().collection("authors").findOne({ _id: authorId });
    const newPost = { 
      destination: req.body.destination,
      groupSize: req.body.groupSize,
      flightHours: req.body.flightHours,
      summary: req.body.summary,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      picture:req.body.file,
      dateNow: new Date(),
      author: {
        id: authorId,
        name: author.name,
        email: author.email,
      },
    };
    const result = await db.getDb().collection('posts').insertOne(newPost);

    console.log('insertedone',result);

  }
  catch(e){
    console.log(e);
  }

});

const deletePost = async (req, res) => {
  
  const postId = new ObjectId(req.params.id);
  const result = await db.getDb().collection('posts').deleteOne({_id: postId});
  console.log(result);
  
}

app.get("/hello", async function (req, res) {
  try {
    res.send("donkey");
    
  } catch (e) {
    console.log(e);
  }
});

app.route('/posts')
  .get(getPosts);
 
app.route('/posts/:id')
  .get(getPostById);

  app.route('/posts/:id/delete')
  .get(getPostById);

  app.route('/posts/:id/edit')
  .get(getPostById);

app.post('/posts/:id/delete', deletePost);
 
app.post('/posts/:id/edit', function(req,res){

  const postId = new ObjectId(req.params.id);
  console.log('postId',postId);

    const updatedPost = {
      destination: req.body.destination,
      groupSize: req.body.groupSize,
      flightHours: req.body.flightHours,
      summary: req.body.summary,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      pictures: req.body.pictures,
    };
  const result = db.getDb().collection('posts').updateOne({_id: postId}, {$set: updatedPost});
  console.log(result);
});

app.listen(3003);