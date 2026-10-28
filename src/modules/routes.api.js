
const express = require("express");
const path = require("path");

const apiRouter = express.Router();

const db = require("./db");

apiRouter.post("/login" , (req , res) => {
    res.json({msg:"logged"});
});

module.exports = apiRouter;