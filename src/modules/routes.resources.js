const express = require("express");
const resources = express.Router();

const db = require("./db");

resources.post("/" , (req , res) => {
    const sql = "SELECT * FROM `resources`"
    db.query(sql , [] , (err , result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({success:false , msg : "Internal Server Error"});
        };
        res.status(200).json({success : true , data : result});
    })
})

module.exports = resources;

