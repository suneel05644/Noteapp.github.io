const Notes = require("../model/notes.model");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
  res.send("Greetings from the Test controller!");
};

exports.create = async function (req, res) {
  let note = new Notes({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    await note.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
};

// exports.details = async function (req, res) {
//   try {
//     const note = await Notes.findById(req.params.id);
//     if (!note) {
//       return res.status(404);
//     }
//     res.status(200).send(note);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

exports.update = async function (req, res) {
  try {
    const note = await Notes.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note) {
      return res.status(404).send();
    }
    res.redirect("/");
    // res.status(200).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.Delete = async function (req, res) {
  try {
    const note = await Notes.findOneAndDelete(req.params.id);
    if (!note) {
      return res.status(404).send();
    }
    res.redirect("/");
    // res.status(200).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteall = async function (req, res) {
  try {
    const note = await Notes.deleteMany({});
    console.log(note);
    res.send(note);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
