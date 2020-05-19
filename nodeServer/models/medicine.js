module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "medicine",
    {
      mediCode: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: true,
        unique: true,
      },
      mediName: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      mediType: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      permissionDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      cancelDate: {
        type: DataTypes.DATE,
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
