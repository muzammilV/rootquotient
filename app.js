require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// To supress mongoose deprecation warning
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

// to handle request from client application
const { userRoute, askRoute } = require("./routes/index");

app.use("/api/ask", askRoute);
app.use("/user", userRoute);

app.use(express.static("public"));
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
app.use(history());
app.use(
  serveStatic("./statics/dist/spa", { index: ["index.html", "index.htm"] })
);

app.use((req, res, next) => {
  return res.status(400).json({ message: err });
});

/**To handle error passed using next({code:errorCode,msg:"Error Message"}) */
app.use((err, req, res, next) => {
  let statusCode = err.code || 500; //if there is no err.code 500 will be used
  res.status(statusCode).json({ msg: err.msg });
});

let PORT = process.env.PORT || 8116;

app.listen(PORT, () => {
  console.log("App is on port:", PORT);
});
