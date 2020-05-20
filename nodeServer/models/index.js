const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Medicine = require("./medicine")(sequelize, Sequelize);
db.Company = require("./company")(sequelize, Sequelize);

db.Company.hasMany(db.User, {
  foreignKey: "companyCode",
  sourceKey: "companyCode",
});
db.User.belongsTo(db.Company, {
  foreignKey: "companyCode",
  sourceKey: "companyCode",
});

db.Company.hasMany(db.Medicine, {
  foreignKey: "companyCode",
  sourceKey: "companyCode",
});
db.Medicine.belongsTo(db.Company, {
  foreignKey: "companyCode",
  sourceKey: "companyCode",
});

module.exports = db;
