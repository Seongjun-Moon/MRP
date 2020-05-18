const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
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
db.Temp = require("./temp")(sequelize, Sequelize);
db.Medicine = require("./medicine")(sequelize, Sequelize);
db.Vendor = require("./vendor")(sequelize, Sequelize);

db.Vendor.hasMany(db.User, { foreignKey: "업체코드", sourceKey: "업체코드" });
db.User.belongsTo(db.Vendor, { foreignKey: "업체코드", sourceKey: "업체코드" });

db.Vendor.hasMany(db.Medicine, {
  foreignKey: "업체코드",
  sourceKey: "업체코드",
});
db.Medicine.belongsTo(db.Vendor, {
  foreignKey: "업체코드",
  sourceKey: "업체코드",
});

module.exports = db;
