module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "temp",
    {
      바코드: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );
};
