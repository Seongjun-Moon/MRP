module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "company",
    {
      companyCode: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: true,
        unique: true,
      },
      companyName: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      companyType: {
        type: DataTypes.STRING(15),
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
