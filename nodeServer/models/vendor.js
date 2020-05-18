module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "vendor",
    {
      업체코드: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: true,
        unique: true,
      },
      업체명: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      사업자등록번호: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      영업형태: {
        type: DataTypes.STRING(20),
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
