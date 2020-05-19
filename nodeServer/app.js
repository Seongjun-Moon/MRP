const express = require("express");
const app = express();
const path = require("path");
const sequelize = require("./models").sequelize;

sequelize.sync();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(9090, () => {
  console.log("MRP Node Server(9090) listen...");
});
