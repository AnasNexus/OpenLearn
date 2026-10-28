
const express = require("express");
const router = express.Router();
const path = require("path");

const viewsPath = path.join(__dirname, "..", "..", "views");

router.get("/", (req, res) => {
    res.sendFile(path.join(viewsPath, "index.html"));
});

router.get("/home", (req, res) => {
    res.sendFile(path.join(viewsPath, "Home.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(viewsPath, "login.html"));
});

router.get("/register", (req, res) => {
    res.sendFile(path.join(viewsPath, "register.html"));
});

router.get("/add-resource", (req, res) => {
    res.sendFile(path.join(viewsPath, "addresource.html"));
});

router.get("/admin", (req, res) => {
    res.sendFile(path.join(viewsPath, "admin.html"));
});

router.get("/admin/resources", (req, res) => {
    res.sendFile(path.join(viewsPath, "adminresources.html"));
});

module.exports = router;
