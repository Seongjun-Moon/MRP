const express = require("express");
const app = express();
const path = require("path");
const sequelize = require("./models").sequelize;

sequelize.sync();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("distributor", require('./routers/distributorRouter'));
app.use("hospital", require('./routers/hospitalRouter'));
app.use("manufacture", require('./routers/manufacturerRouter'));
app.use("oversee", require('./routers/overseeRouter'));

app.listen(9090, () => {
  console.log("MRP Node Server(9090) listen...");
});
