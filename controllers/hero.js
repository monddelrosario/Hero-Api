const Hero = require("../models/hero");
const multer = require("multer");

//GET '/hero/all'
const getAllHero = (req, res, next) => {
  Hero.find({}, (err, data) => {
    if (err) {
      return res.json({ Error: err });
    }
    return res.json(data);
  });
};

//POST '/hero'
const newHero = (req, res, next) => {
  //check if the hero name already exists in db
  Hero.findOne({ name: req.body.name }, (data) => {
    //if hero not in db, add it
    if (data === null) {
      //create a new hero object using the hero model and req.body
      const newHero = new Hero({
        name: req.body.name,
        image: req.file.path,
        description: req.body.description,
        keywords: req.body.keywords,
        origin: req.body.origin,
        wins: req.body.wins,
        looses: req.body.looses,
        type: req.body.type,
      });

      // save this object to database
      newHero.save((err, data) => {
        if (err) return res.json({ Error: err });
        return res.json(data);
      });
      //if hero is in db, return a message to inform it exists
    } else {
      return res.json({ message: "Hero already exists" });
    }
  });
};

//DELETE '/hero'
const deleteAllHero = (req, res, next) => {
  Hero.deleteMany({}, (err) => {
    if (err) {
      return res.json({ message: "Complete delete failed" });
    }
    return res.json({ message: "Complete delete successful" });
  });
};

//GET '/hero/:name'
const getOneHero = (req, res, next) => {
  let name = req.params.name; //get the hero name

  //find the specific hero with that name
  Hero.findOne({ name: name }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Hero doesn't exist." });
    } else return res.json(data); //return the hero object if found
  });
};

//POST '/hero/:name'
const newComment = (req, res, next) => {
  let name = req.params.name; //get the hero to add the comment in
  let newComment = req.body.comment; //get the comment
  //create a comment object to push
  const comment = {
    text: newComment,
    date: new Date(),
  };
  //find the hero object
  Hero.findOne({ name: name }, (err, data) => {
    if (err || !data || !newComment) {
      return res.json({ message: "Hero doesn't exist." });
    } else {
      //add comment to comments array of the hero object
      data.comments.push(comment);
      //save changes to db
      data.save((err) => {
        if (err) {
          return res.json({ message: "Comment failed to add.", error: err });
        }
        return res.json(data);
      });
    }
  });
};

//DELETE '/hero/:name'
const deleteOneHero = (req, res, next) => {
  let name = req.params.name; // get the name of hero to delete

  Hero.deleteOne({ name: name }, (err, data) => {
    if (err || !data) {
      return res.json({ message: "Hero doesn't exist." });
    } else return res.json({ message: "Hero deleted." }); //deleted if found
  });
};

//UPLOAD IMAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadImg = multer({ storage: storage }).single("image");

//export controller functions
module.exports = {
  getAllHero,
  uploadImg,
  newHero,
  deleteAllHero,
  getOneHero,
  newComment,
  deleteOneHero,
};
