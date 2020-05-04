import mysql from "mysql2";
import config from "@app/config";

// create the connection to database
const connection = mysql.createPool({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    database: config.MYSQL_DATABASE,
    password : config.MYSQL_PASSWORD,
    port: config.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default connection;
