const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
    res.json({"msg": "SUCCESS"});
});

module.exports = app;