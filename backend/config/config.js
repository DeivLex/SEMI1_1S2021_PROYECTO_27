const dotenv = require("dotenv");
dotenv.config()
module.exports.configdb = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE
};