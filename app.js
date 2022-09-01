const express = require("express");
const app = express();

const PORT = 5000;
const HOSTNAME = "127.0.0.1";

app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   res.status(200).send("<h1>HOME</h1>");
// });

app.all("*", (req, res) => {
  res.status(404).send("<h1>wrong adress</h1>");
});

app.listen(PORT, HOSTNAME, (req, res) => {
  console.log(`Started listening to: ${HOSTNAME}:${PORT}`);
});
