const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const automationDB = require("./middlewares/automationDB");

const app = express();
const env = process.env;

dotenv.config();
automationDB;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("distributor", require('./routers/distributorRouter'));
app.use("hospital", require('./routers/hospitalRouter'));
app.use("manufacture", require('./routers/manufacturerRouter'));
app.use("oversee", require('./routers/overseeRouter'));

app.listen(env.PORT, () => {
  console.log(`MRP Node Server${env.PORT} listen...`);

});
