const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const helmet = require("helmet");
const morgan = require("morgan");
const genresRouter = require("./routes/genres");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("dev"));
  startupDebugger("Morgan enabled....");
}
dbDebugger("Connected to the Database...");

app.set("view engine", "pug");

app.get("/", (req, res) =>
  res.render("index", {
    title: "Pug Templates",
    heading: "Hello Node DevBitch....",
  })
);

app.use("/api/genres", genresRouter);

const port = process.env.PORT || "3000";
app.listen(port);
