module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.STRING(20),
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
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  );
};
