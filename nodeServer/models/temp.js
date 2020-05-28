module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "temp",
    {
      barcode: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: true,
        unique: true,
      },
      targetCompanyCode: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      timestamps: true,
      paranoid: true,
    }
  );
};