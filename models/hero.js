const mongoose = require("mongoose"); //import mongoose

// hero schema
const HeroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  description: String,
  keywords: String,
  origin: String,
  wins: Number,
  looses: Number,
  type: String,
  comments: [{ text: String, date: { type: String, default: new Date() } }],
});

const Hero = mongoose.model("Hero", HeroSchema); //convert to model named Hero
module.exports = Hero; //export for controller use
