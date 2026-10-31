const express = require("express");
const resources = express.Router();

const db = require("./db");

resources.get("/", (req, res) => {
    const sql = `
        SELECT *
        FROM resources
        ORDER BY title ASC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Get resources Error:", err);

            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }

        return res.status(200).json({
            success: true,
            count: result.length,
            data: result
        });
    });
});


module.exports = resources;

