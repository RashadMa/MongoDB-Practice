const { default: mongoose, mongo } = require("mongoose");

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const connectionString =
  "mongodb+srv://rashadkhm:011220007298rR@cluster0.tbjmxpd.mongodb.net/";

mongoose.connect(connectionString).catch((err) => {
  console.log("ERR", err);
});

const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  body: String,
  likeCount: Number,
});

const User = mongoose.model("posts", postSchema);

app.post("/api/posts", async (req, res) => {
  let user = {
    title: req.body.title,
    body: req.body.body,
    likeCount: req.body.likeCount,
  };
  const data = await User.create(user);
  res.send(data);
});

app.get("/api/posts", async (req, res) => {
  const data = await User.find({});
  res.send(data);
});

app.get("/api/posts/:id", async (req, res) => {
  const data = await User.findById(req.params.id);
  res.send(data);
});

app.delete("/api/posts/:id", async (req, res) => {
  const data = await User.findByIdAndDelete(req.params.id);
  res.send(data);
});

app.put("/api/posts/:id", async (req, res) => {
  const data = await User.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    body: req.body.body,
    likeCount: req.body.likeCount,
  });
  res.send(data);
});

app.listen(8080);
