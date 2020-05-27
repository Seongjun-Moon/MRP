const medicine = require("../models").Medicine;
const company = require("../models").Company;

// 의약품 유통이력 조회
const search = async (res, req) => {};

// 의약품 정보 등록
const mediEnroll = async (req, res) => {
  const mediCode = req.body.mediCode;
  const companyCode = req.body.companyCode;
  const mediName = req.body.mediName;
  const mediType = req.body.mediType;
  const count = req.body.count;
  const permissionDate = req.body.permissionDate;
  const cancelDate = req.body.cancelDate;

  try {
    const mediEnroll = await medicine.create({
      mediCode,
      companyCode,
      mediName,
      mediType,
      count,
      permissionDate,
      cancelDate,
    });
    console.log(mediEnroll);
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

// 의약품 정보 조회
const mediInfo = async (req, res) => {
  try {
    const mediInfo = await medicine.findAll({
      attributes: [
        "mediCode",
        "companyCode",
        "mediName",
        "mediType",
        "count",
        "permissionDate",
        "cancelDate",
      ],

      order: [["permissionDate", "DESC"]],
    });

    console.log(mediInfo);
    res.json(mediInfo);
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

// 의약품 세부내용 조회
const mediDetail = async (req, res) => {
  const mediCode = req.body.barcode.substr(4, 13);
  try {
    const mediDetail = await medicine.findAll({
      where: {
        mediCode,
      },
    });
    // console.log(mediDetail)
    res.json(mediDetail);
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

module.exports = { search, mediEnroll, mediInfo, companyInfo, mediDetail };