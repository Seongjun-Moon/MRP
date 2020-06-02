const company = require("../models").Company;
const sequelize = require("sequelize");

//React Native에서 회사명 검색
const searchCompanyByName = async (req, res) => {
  const keyword = req.body.keyword;

  try {
    const companyInfo = await company.findAll({
      where: {
        companyName: { [sequelize.Op.like]: "%" + keyword + "%" },
      },
      attributes: ["companyName", "companyCode", "companyType"],
    });

    console.log(company);
    res.json({ message: true, companyInfo });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

//업체 등록
const companyEnroll = async (req, res) => {
  const companyCode = req.body.companyCode;
  const companyName = req.body.companyName;
  const companyType = req.body.companyType;

  try {
    const companyEnroll = await company.create({
      companyCode,
      companyName,
      companyType,
    });

    console.log(companyEnroll);
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

// 업체 정보 조회
const companyInfo = async (req, res) => {
  try {
    const companyInfo = await company.findAll({
      attributes: ["companyCode", "companyName", "companyType"],
      order: [["companyCode", "ASC"]],
    });

    console.log(companyInfo);
    res.json(companyInfo);
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

module.exports = { searchCompanyByName, companyEnroll, companyInfo };
