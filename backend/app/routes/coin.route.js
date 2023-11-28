const express = require("express");
const coin = require("../controllers/coin.controller");
const router = express.Router();

router.route("/")
    .get(coin.findAll)
    .post(coin.create)
    .delete(coin.deleteAll);

router.route("/:id")
    .get(coin.findOne)
    .put(coin.update)
    .delete(coin.delete);

module.exports = router;
