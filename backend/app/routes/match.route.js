const express = require("express");
const match = require("../controllers/match.controller");
const router = express.Router();

router.route("/")
    .get(match.findAll)
    .post(match.create)
    .delete(match.deleteAll);

router.route("/:id")
    .get(match.findOne)
    .put(match.update)
    .delete(match.delete);

module.exports = router;
