const mysql = require("mysql2");

const db = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
});

db.getConnection((err , connection) => {
    if (err) {
        console.error("Error in Data Base ✖️ : " , err);
        return;
    };
    if (connection) {
        connection.release();
        console.log("Connected To DB ✔️ ");
    };
});

module.exports = db;
