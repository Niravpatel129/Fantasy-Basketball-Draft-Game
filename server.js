const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
var mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose
app.get(
  "https://slack.com/oauth/authorize?scope=identity.basic&client_id=2222937506.634323100293",
  (req, res) => {
    console.log(req.body);
  }
);
//Route Practice
app.get("/api/home", function(req, res) {
  res.send("Welcome!");
});
app.get("/api/secret", function(req, res) {
  console.log("Hello world!");
  res.send("The password is potato");
});

// API calls
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});
app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

app.post("/login", (req, res) => {
  console.log(
    `I received your POST request. This is what you sent me: ${req.body}`
  );
});
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
