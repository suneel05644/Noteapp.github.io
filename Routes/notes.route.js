const express = require("express");
const router = express.Router();
// Require the controllers WHICH WE DID NOT CREATE YET!!
const Note = require("../controller/notes.controller");
const Notess = require("../model/notes.model");
// a simple test url to check that all of our files are communicating correctly.
router.get("/test", Note.test);
router.get("/new", (req, res) => {
  res.render("new");
});
router.post("/", Note.create);
router.get("/edit", async (req, res) => {
  const notes = await Notess.find(req.param.id);
  res.render("edit", { notes: notes });
});
// router.get("/getAll", Note.getAll);
// router.get("/details/:id", Note.details);
router.put("/update/:id", Note.update);
router.delete("/deleteall", Note.deleteall);
router.delete("/delete/:id", Note.Delete);

module.exports = router;
