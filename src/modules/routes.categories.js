
const express = require("express");
const categories = express.Router();

const db = require("./db");

categories.get("/", (req, res) => {
    const sql = `
        SELECT id, name, slug, description , icon , color
        FROM categories
        ORDER BY name ASC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Get Categories Error:", err);

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

module.exports = categories;
