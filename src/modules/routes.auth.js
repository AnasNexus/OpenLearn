
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const path = require("path");

const authRoutes = express.Router();
const secret = process.env.JWT_SECRET;

const db = require("./db");

authRoutes.post("/login" , (req , res) => {
    const {username , password} = req.body;
    if (!username || !password) {
        res.status(400).json({success : false , msg : "Invalid username or password"});
        return;
    }

    const sql = "SELECT * FROM `openlearn` WHERE `username`=? OR `email`=?";
    db.query(sql , [username , username] , async (err , result) => {
        if (err) return res.status(500).json({success:false , msg:"Internal Server Error"});

        if (result.length > 0) {
            const user = result[0];
            const usr = {
                username:username,
                email:user.email,
                UUID:user.UUID,
            }

            const is_match = await bcrypt.compare(password , user.password);
            if (is_match) {
                const token = jwt.sign(usr , secret , {expiresIn:"24h"});
                res.status(200).json({success:true , token : token});
            }else{
                return res.status(403).json({success:false , msg:"Invalid username or password"});
            }
        }else return res.status(403).json({success:false , msg:"Invalid username or password"});
    });
});

authRoutes.post("/register" , (req , res) => {
    const {username , password , email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({success:false , msg:"Invalid username or password"});
    };

    const sql = "SELECT * FROM `users` WHERE `username`=? OR `email`=?"

    db.query(sql , [username , email] , (err , result) => {
        if (err) return res.status(500).json({success:false , msg:"Internal Server Error"});

        if (result > 0) {
            return res.status(429).json({success:false , msg : "Already used username OR email"})
        }else{
            const sql2 = "INSERT INTO `users`(`UUID`, `username`, `password`, `email`) VALUES (? , ? , ? , ?)";

            const UUID = Math.floor(1000 + Math.random() * 9000);

            db.query(sql2 , [UUID , username , password , email] , (err , result) => {
                if (err) return res.status(500).json({success:false , msg:"Internal Server Error"});

                if (result.affectedRows > 0) {
                    const usr = {username , email , UUID};
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