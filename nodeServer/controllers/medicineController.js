const medicine = require("../models").Medicine;
const sequelize = require("sequelize");

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

const searchedMediInfo = async (req, res) => {
  const mediName = String(req.body.keyword);
  console.log(req.body.keyword);
  try {
    const Searchedmedicine = await medicine.findAll({
      where: {
        mediName: { [sequelize.Op.like]: "%" + mediName + "%" },
      },
    });
    if (!Searchedmedicine) {
      res.json({ message: false });
    } else {
      res.json({ data: Searchedmedicine });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

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

module.exports = { mediDetail, searchedMediInfo, mediEnroll, mediInfo };
