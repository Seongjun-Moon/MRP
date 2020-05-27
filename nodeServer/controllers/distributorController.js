const company = require("../models").Company;
const temp = require("../models").Temp;

// 입,출고 등록
const productEnroll = async (req, res) => {
  const barcode = req.body.data.barcode;
  const companyCode = req.body.data.companyCode;
  const targetCompanyCode = req.body.data.targetCompanyCode;
  const state = req.body.data.state;

  try {
    const getCompanyCode = await company.findOne({
      attributes: ["companyCode"],
    });
    if (!getCompanyCode) {
      res.json({ message: false });
    } else {
      try {
        const productEnroll = await temp.create({
          barcode,
          companyCode,
          targetCompanyCode,
          state,
        });

        console.log(productEnroll);
        res.json({ message: true, productEnroll: productEnroll });
      } catch (err) {
        console.log(err);
        res.json({ message: false });
      }
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

// 의약품 유통이력 조회
const search = async (res, req) => {};

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

module.exports = { productEnroll, search, companyEnroll, companyInfo };
