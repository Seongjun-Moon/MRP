module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
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
