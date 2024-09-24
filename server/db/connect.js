import mysql from "mysql";

export const db = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  port: "",
  database: "",
});
