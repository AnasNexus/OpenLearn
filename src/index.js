require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const router = require("./modules/routes");
const authRoutes = require("./modules/routes.auth");

app.use(cors({
    origin:"*"
}));

app.use("/" , router);
app.use("/auth" , authRoutes);

app.listen(5000 , () => {
    console.log("Server Is Running");
});
