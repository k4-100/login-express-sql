const express = require("express");
const mysql = require("mysql");
const { users, getNextID } = require("./data");

const PORT = 5000;
const HOSTNAME = "127.0.0.1";

const app = express();
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "login",
});

// Connecting to database
connection.connect((err) => {
  if (err) {
    console.log("Error in the connection");
    console.log(err);
  } else {
    console.log(`Database Connected`);
    connection.query(`SELECT * FROM login.users`, (err, result) => {
      if (err) console.log(`Error executing the query - ${err}`);
      else console.log("Result: ", result);
    });
  }
});

app.use(express.static("./public"));
// parse form data
app.use(express.urlencoded({ extended: false }));

app.post("/login", (req, res) => {
  const { name, password } = req.body;

  if (name && password) {
    users.push({
      id: getNextID(),
      name,
      password,
    });
    console.log(users);
    return res.status(201).send("<h1>account created</h1>");
  }

  res.status(404).send("<p>ERROR: no user name or password provided</p>");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>wrong adress</h1>");
});

app.listen(PORT, HOSTNAME, (req, res) => {
  console.log(`Started listening to: ${HOSTNAME}:${PORT}`);
});
