// import {Dropbox} from 'dropbox'

const express = require("express");
const { ObjectId } = require("mongodb");
const Dropbox = require("dropbox").Dropbox;
const fetch = require("isomorphic-fetch");
const bcrypt = require("bcryptjs");
const db = require("./data/database");
const { createSearchParams } = require("react-router-dom");
const cors = require("cors");
const app = express();
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

var storeSessions = new MongoDBStore({
  uri: "mongodb://localhost:27017",
  databaseName: "travelblug",
  collection: "sessions",
});

const multer = require("multer");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    store: storeSessions,
  })
);

app.options("/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST");
  res.sendStatus(200);
});

const storageConfig = multer.diskStorage({
  destination: "./images",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storageConfig });
const bp = require("body-parser");
app.use(bp.json());

app.use(bp.urlencoded({ extended: true }));
app.use("/images", express.static("images"));

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
    console.log("here", req.session.user);
    db.connectToDatabase();
    var postArray = [];
    postArray = await db.getDb().collection("posts").find().toArray();
    const posts = postArray;
    res.send(posts);
  } catch (e) {
    console.log(e);
  }
};

const getPostById = async (req, res) => {
  try {
    db.connectToDatabase();
    var postArray = [];
    postArray = await db.getDb().collection("posts").find().toArray();

    const url = req.params.id;

    const post = postArray.filter((p) => p._id.toString() === url);

    if (post[0]) {
      res.send(post[0]);
    } else {
      console.log("it empty");
    }
  } catch (e) {
    console.log(e);
  }
};

app.get("/getAuthors", async function (req, res) {
  try {
    db.connectToDatabase();
    var authorArray = [];
    authorArray = await db.getDb().collection("authors").find().toArray();
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
      picture: uploadedImage.path,
      dateNow: new Date(),
      author: {
        id: authorId,
        name: author.name,
        email: author.email,
      },
    };
    const result = await db.getDb().collection("posts").insertOne(newPost);
  } catch (e) {
    console.log(e);
  }
});

const deletePost = async (req, res) => {
  const postId = new ObjectId(req.params.id);
  const result = await db
    .getDb()
    .collection("posts")
    .deleteOne({ _id: postId });
  console.log(result);
};

app.get("/hello", async function (req, res) {
  try {
    res.send("donkey");
  } catch (e) {
    console.log(e);
  }
});



app.route("/users").get(getUsers);

app.route("/posts").get(getPosts);

app.route("/posts/:id").get(getPostById);

app.route("/posts/:id/delete").get(getPostById);

app.route("/posts/:id/edit").get(getPostById);

app.post("/posts/:id/delete", deletePost);

app.post("/posts/:id/edit", function (req, res) {
  const postId = new ObjectId(req.params.id);

  const updatedPost = {
    destination: req.body.destination,
    groupSize: req.body.groupSize,
    flightHours: req.body.flightHours,
    summary: req.body.summary,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    pictures: req.body.pictures,
  };
  const result = db
    .getDb()
    .collection("posts")
    .updateOne({ _id: postId }, { $set: updatedPost });
});

app.listen(3003);
