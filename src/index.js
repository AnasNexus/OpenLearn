require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const router = require("./modules/routes");
const apiRouter = require("./modules/routes.api");

app.use(cors({
    origin:"*"
}));

app.use("/" , router);
app.use("/api" , apiRouter);

app.listen(5000 , () => {
    console.log("Server Is Running");
});
