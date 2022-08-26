const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const enforce = require("express-sslify");
var timeout = require('connect-timeout')

app.use(cors());
app.use(express.json());
app.use(pdf);
app.use(timeout('5s'))

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

//Connect to mongoose
let mongo_URI = "";
//if (process.env.NODE_ENV == "production") {
//  mongo_URI = process.env.MONGO_URI;
//} else {
  mongo_URI =
    "mongodb+srv://sidhu:7398438689@mernapp.oucv3.mongodb.net/quizDatabase?retryWrites=true&w=majority";
//}
mongoose
  .connect(mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => console.log(err));

//Routes
app.use("/api/auth", require("./routes/users"));


//heroku links
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
});
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
