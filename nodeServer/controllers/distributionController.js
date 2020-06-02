const company = require("../models").Company;
const temp = require("../models").Temp;
const medicine = require("../models").Medicine;
const sequelize = require("sequelize");

// 입,출고 등록
const productEnroll = async (req, res) => {
  const barcode = String(req.body.data.barcode);
  const companyCode = req.body.data.companyCode;
  const targetCompanyCode = req.body.data.targetCompanyCode;
  const state = req.body.data.state;
  const description = req.body.data.description;

  try {
    const getCompanyCode = await company.findOne({
      where: { companyCode: targetCompanyCode },
    });
    if (!getCompanyCode) {
      res.json({ message: false });
    } else {
      try {
        const mediCode = barcode.substring(4, 17); /// barcode 내에서 medicode 뽑아내기
        const barcodeVerify = await medicine.findOne({
          where: { mediCode },
        });
        if (!barcodeVerify) {
          res.json({ message: false });
        } else {
          try {
            const productEnroll = await temp.create({
              barcode,
              companyCode,
              targetCompanyCode,
              state,
              description,
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
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

// 의약품 유통이력 조회
const search = async (res, req) => {};

// 의약품 임시 유통이력 조회
// 바코드 번호, 유통등록 업체 코드, 대상 업체 코드, 상태 , 등록 시간
const tempDistInfo = async (req, res) => {
  const mediCode = req.body.mediCode;
  const companyCode = req.session.companyCode;

  try {
    const tempDistInfo = await temp.findAll({
      where: {
        companyCode,
        barcode: { [sequelize.Op.like]: "%" + mediCode + "%" },
      },
    });
    console.log(tempDistInfo);
    res.json({ message: true, tempDistInfo });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

module.exports = {
  productEnroll,
  search,
  tempDistInfo,
};
