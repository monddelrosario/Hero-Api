const express = require("express"); //import express
const router = express.Router();
const heroController = require("../controllers/hero");

router.get("/hero/all", heroController.getAllHero);
router.post("/hero", heroController.uploadImg, heroController.newHero);
router.delete("/hero", heroController.deleteAllHero);

router.get("/hero/:name", heroController.getOneHero);
router.post("/hero/:name", heroController.newComment);
router.delete("/hero/:name", heroController.deleteOneHero);

module.exports = router; // export to use in server.js
