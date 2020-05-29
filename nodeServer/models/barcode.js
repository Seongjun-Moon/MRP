module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "barcode",
    {
      barcodeName: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: true,
        unique: true,
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
