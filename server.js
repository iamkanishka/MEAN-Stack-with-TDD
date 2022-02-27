var express = require("express");
var bodyparser = require("body-parser");
var helmet = require("helmet");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const moment = require("moment");
connectDB()

let app = express();

app.use(helmet());

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.get("/api", function (req, res) {
  console.log('Response in time'+moment())
  
  res.json("Helo World,I love Coding");
});

//server.close()
app.listen(process.env.HOST_PORT, () => {
  console.log("server listening on port " + process.env.HOST_PORT);
});









// var distDir = __dirname + "/myapp/dist/dockersample/index.html";
// app.use(express.static(distDir));
// app.use(express.static(path.join(__dirname, "/myapp/dist/dockersample/")));
// Put API functionality Routes below the route of Built Angular Application
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "/../dist/dockersample/index.html"));
// });
