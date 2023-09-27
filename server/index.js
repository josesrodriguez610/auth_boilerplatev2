require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const cookieParser = require("cookie-parser");

const { authRouter } = require("./routes/authRoutes");
const { userRouter } = require("./routes/userRoutes");
const path = require("path");
const database = require("./db/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);

if (process.env.FRONTEND === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

const apiVersion = "/api/v1";

app.use(`${apiVersion}/auth`, cors(), authRouter);
app.use(`${apiVersion}/users`, cors(), userRouter);

if (process.env.FRONTEND === "production") {
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
  });
}

database();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
