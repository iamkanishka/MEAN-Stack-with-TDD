var express = require("express");
var bodyparser = require("body-parser");

var PORT = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");

let app = express();

var distDir = __dirname + "/myapp/dist/dockersample/index.html";
app.use(express.static(distDir));
app.use(express.static(path.join(__dirname, "/myapp/dist/dockersample/")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.get("/code", function (req, res) {
    res.send('I love Coding');
  });

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/../dist/dockersample/index.html"));
});


//server.close()
app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});
