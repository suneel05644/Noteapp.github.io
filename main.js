const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./model/notes.model");
const Noteapp = require("./Routes/notes.route");
const methodOverride = require("method-override");

const app = express();

mongoose.connect(
  "mongodb://localhost:27017/Notes",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./view");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const notes = await Note.find().sort("-createdAt");
  res.render("index", { notes: notes });
});

app.use("/", Noteapp);

app.listen(3000, () => {
  console.log("welocome to the server" + 3000);
});
