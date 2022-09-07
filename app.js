const express = require("express");
const mysql = require("mysql");
const { getUser } = require("./data");

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
    return;
  }

  console.log(`Database Connected`);
  connection.query(`SELECT * FROM login.users`, (err, result) => {
    if (err) console.log(`Error executing the query - ${err}`);
    else console.log("Result: ", result);
  });
});

app.use(express.static("./public"));
// parse form data
app.use(express.urlencoded({ extended: false }));

app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  if (name && password) {
    connection.query(
      `INSERT INTO login.users VALUES(null,'${name}','${password}')`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const p1 = new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM login.users WHERE users.name="${name}" AND users.password="${password}"`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          const data = {
            success: true,
            result,
          };
          resolve(data);
        }
      );
    }).then((dt) => {
      const { id, name } = dt.result[0];
      const msg = dt
        ? `<h1>name: ${name}</h1> <h4>id: ${id}</h4>`
        : '<h1> CAN"T FIND A USER </h1>';
      return res.status(201).send(msg);
    });

    return await p1;
  }

  res.status(404).send("<p>ERROR: no user name or password provided</p>");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>wrong adress</h1>");
});

app.listen(PORT, HOSTNAME, (req, res) => {
  console.log(`Started listening to: ${HOSTNAME}:${PORT}`);
});
