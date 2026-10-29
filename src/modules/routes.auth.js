
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");


const path = require("path");

const authRoutes = express.Router();
const secret = process.env.JWT_SECRET;

const db = require("./db");


authRoutes.post("/login", (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            msg: "Invalid username or password"
        });
    }

    const sql = "SELECT * FROM `users` WHERE `username` = ? OR `email` = ?";

    db.query(sql, [username, username], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                success: false,
                msg: "Invalid username or password"
            });
        }

        try {
            const user = result[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    msg: "Invalid username or password"
                });
            }

            const payload = {
                username: user.username,
                email: user.email,
                UUID: user.UUID,
                role:user.role
            };

            const token = jwt.sign(payload, secret, {
                expiresIn: "24h"
            });

            return res.status(200).json({
                success: true,
                token
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    });
});

authRoutes.post("/register" , (req , res) => {
    const {username , password , email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({success:false , msg:"Invalid username or password"});
    };

    const sql = "SELECT * FROM `users` WHERE `username`=? OR `email`=?"

    db.query(sql , [username , email] , async (err , result) => {
        if (err) return res.status(500).json({success:false , msg:"Internal Server Error"});

        if (result > 0) {
            return res.status(429).json({success:false , msg : "Already used username OR email"})
        }else{
            const sql2 = "INSERT INTO `users`(`UUID`, `username`, `password`, `email`) VALUES (? , ? , ? , ?)";

            const UUID = randomUUID();
            const hash = await bcrypt.hash(password , 10);
            db.query(sql2 , [UUID , username , hash , email] , (err , result) => {
                if (err) return res.status(500).json({success:false , msg:"Internal Server Error"});

                if (result.affectedRows > 0) {
                    const usr = {username : username , email : email, UUID : UUID , role:"user"};
                    const token = jwt.sign(usr , secret , {expiresIn:"24h"});
                    res.status(200).json({success : true , token : token})
                }else{
                    return res.status(500).json({success:false , msg:"Internal Server Error"});
                };
            });
        };
    });
});

module.exports = authRoutes;