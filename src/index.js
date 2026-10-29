require("dotenv").config();
const express = require("express");
const cors = require("cors");

const path = require("path");

const app = express();

const router = require("./modules/routes");
const authRoutes = require("./modules/routes.auth");
const resources = require("./modules/routes.resources");
const categories = require("./modules/routes.categories");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:"*"
}));

app.use(express.static(path.join(__dirname , ".." , "public")));

app.use("/" , router);
app.use("/auth" , authRoutes);
app.use("/api/resources" , resources);
app.use("/api/categories" , categories);

app.listen(5000 , () => {
    console.log("Server Is Running");
});
