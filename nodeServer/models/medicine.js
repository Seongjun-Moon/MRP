module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "medicine",
    {
      의약품표준코드: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: true,
        unique: true,
      },
      제조번호: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      유효기간: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      일련번호: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      한글상품명: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      제조업체명: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      의약품유형: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      약품규격: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      제품총수량: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      제형구분: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      포장형태: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      품목허가일자: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      취소일자: {
        type: DataTypes.BOOLEAN,
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
