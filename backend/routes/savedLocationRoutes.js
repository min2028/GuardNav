var express = require("express");
var router = express.Router();
var SavedLocationController = require("../controllers/savedLocationController");

router.post("/", SavedLocationController.addSavedLocation);
router.delete("/:id", SavedLocationController.deleteSavedLocation);

module.exports = router;
