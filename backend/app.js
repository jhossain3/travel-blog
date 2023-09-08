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
require('dotenv').config();

let port = 3003;

if (process.env.PORT) {
  port = process.env.PORT;
}

app.use(express.json());

var storeSessions = new MongoDBStore({
  uri: "mongodb://localhost:27017",
  databaseName: "travelblug",
  collection: "sessions",
});

app.use(
  session({
    secret: "1234",
    name: 'mySessionCookie',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: storeSessions,
    
  })
);
const multer = require("multer");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.set('trust proxy', 1) // trust first proxy


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

app.post("/users", async function (req, res) {
  try {
    const newUser = {
      user: req.body.username,
      email: req.body.email,
      confirmemail: req.body.confirmemail,
      password: await bcrypt.hash(req.body.password, 12),
    };
    await db.getDb().collection("users").insertOne(newUser);
    res.redirect("http://localhost:3000/discover");
  } catch (e) {
    console.log(e);
  }
});

// function authenticateToken(req,res,next){
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split('')[1]
//   if (token == null ){
//     return res.sendStatus(401)
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,( err, user) => {
//     if (err)  return res.sendStatus(403)
//     req.user = user
//     next()
//   })
// }

app.post("/login", async function (req, res) {
  try {
    const userData = req.body;
    const enteredUsername = userData.username;
    const enteredPassword = userData.password;
    const existingUser = await db
      .getDb()
      .collection("users")
      .findOne({ user: enteredUsername });

    if (!existingUser) {
      console.log("couldnt log in");
      return res.redirect("http://localhost:3000/login");
    }

    const passwordCorrect = await bcrypt.compare(
      enteredPassword,
      existingUser.password
    );

    if (!passwordCorrect) {
      console.log("password wrong");
      return res.redirect("http://localhost:3000/login");
    }

    req.session.user = {id: existingUser._id}
    req.session.isAuthenticated = true;
    console.log('session',req.sessionID);
    req.session.save(function(){
      res.send({token: req.sessionID})

      
    })
  }
    
    // const accessToken = jwt.sign(enteredUsername, process.env.ACCESS_TOKEN_SECRET);
    // console.log('accessToken',accessToken);
    //   return res.send({token: accessToken});

    catch (e) {
    console.log(e);
  }
});


app.get("/login", (req, res) => {
  if (req.session.user) {
    console.log("succesful");
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    console.log("not success");
    console.log('req.session.user',req.session.user);
    res.send({ loggedIn: false });
  }
});

app.post("/logout", (req, res) => {
  req.session.user = null;
  req.session.isAuthenticated = false;

  return res.send(200);

});


const getUsers = async (req, res) => {
  try {
    db.connectToDatabase();
    var userArray = [];
    userArray = await db.getDb().collection("users").find().toArray();

    const users = userArray;
    res.send(users);
  } catch (e) {
    console.log(e);
  }
};

app.post("/posts", upload.single("file"), async function (req, res) {
  try {
    const authorId = new ObjectId(req.body.author);
    const uploadedImage = req.file;
    const author = await db
      .getDb()
      .collection("authors")
      .findOne({ _id: authorId });
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

app.listen(port);
