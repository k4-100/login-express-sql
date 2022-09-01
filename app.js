const express = require("express");
const app = express();
const { users, getNextID } = require("./data");

const PORT = 5000;
const HOSTNAME = "127.0.0.1";

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
