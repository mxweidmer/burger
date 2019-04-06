var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var handleObj = {
            burgers: data
        };
        res.render("index", handleObj);
    });
});
