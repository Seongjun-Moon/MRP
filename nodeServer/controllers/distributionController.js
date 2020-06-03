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
              mediCode,
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
// mediName, companyCode, targetCompanyCode
const tempDistInfo = async (req, res) => {
  const mediCode = req.body.mediCode;
  const companyCode = req.session.companyCode;

  try {
    const tempDistInfo = await temp.findAll({
      where: {
        companyCode,
        barcode: { [sequelize.Op.like]: "%" + mediCode + "%" },
      },
      include: [
        {
          model: medicine,
          attributes: ["mediName"],
          where: {},
        },
        {
          model: company,
          attributes: ["companyName"],
          where: {},
        },
      ],
      /*include: [
        {
          model: company,
          as: "MyCompany",
          attributes: ["companyName"],
          where: { companyCode },
        },
      ] 
      include: [
        {
          model: company,
          as: "targetCompany",
          attributes: ["companyName"],
          where: { companyCode: "DIST-0000000002" },
        },
      ],*/
    });
    const getTargetName = await temp.findAll({
      where: { companyCode },
      attributes: ["targetCompanyCode"],
      include: [
        {
          model: company,
          on: {
            col1: sequelize.where(
              sequelize.col("temp.targetCompanyCode"),
              "=",
              sequelize.col("company.companyCode")
            ),
          },
          attributes: ["companyName"],
        },
      ],
    });
    console.log(tempDistInfo);
    console.log("::::::::::::");
    console.log(getTargetName);
    console.log("::::::::::::");
    res.json({ message: true, tempDistInfo, getTargetName });
    /* if (!tempDistInfo) {
      res.json({ message: false });
    } else {
      try {
        const getMediName = await temp.findAll({
          where: { mediCode: { [sequelize.Op.like]: "%" + mediCode + "%" } },
          include: [
            {
              model: medicine,
              attributes: ["mediName"],
              include: {
                model: company,
                attributes: ["companyName"],
                where: companyCode,
              },
            },
          ],
        });

        const getTargetName = await temp.findAll({
          attributes: ["targetCompanyCode"],
          include: {
            model: company,
            attributes: ["companyName"],
            // where: { companyCode: tempDistInfo[i].targetCompanyCode },
          },
          // where: { targetCompanyCode },
        }); */

    /* console.log(";;;;;;;;;;;;");
        console.log(getMediName);
        console.log(";;;;;;;;;;;;");
        console.log(getTargetName);
        console.log(";;;;;;;;;;;;");
        res.json({ message: true, getMediName, getTargetName }); */
    // for (let i = 0; tempDistInfo.length; i++)
    /* const companyNameInfo = await medicine.findAll({
            where: { mediCode: tempDistInfo[i].barcode.substring(4, 17) },
            attributes: ["mediName"],
            include: {
              model: company,
              attributes: ["companyName"],
              where: {
                companyCode: tempDistInfo[i].companyCode,
              },
            },
          });
          const targetNameInfo = await company.findAll({
            where: { companyCode: tempDistInfo[i].targetCompanyCode },
            attributes: ["companyName"],
          });
        

        console.log(":;;;;;;;;;;;;;;;;;");
        console.log(companyNameInfo);
        console.log(":;;;;;;;;;;;;;;;;;");
        console.log(targetNameInfo);
        console.log(":;;;;;;;;;;;;;;;;;");
        const Info = [companyNameInfo, tempDistInfo, targetNameInfo];
        res.json({
          message: true,
          Info,
        }); */
    /* } catch (err) {
        console.log(err);
        res.json({ message: false });
      }
    } */
    /*  const getBarCode = await temp.findAll({
      attributes: ["barcode"],
    });
    console.log(getBarCode[0].barcode);

    const getMediCode = await medicine.findAll({
      where: { mediCode: getBarCode[i].barcode.substring(4, 17) },
      attributes: ["mediName"],
    }); */
    /* 
    console.log("==========================");
    // console.log(getBarCode);
    console.log(tempDistInfo[0].barcode);
    console.log("==========================");
    console.log(tempDistInfo);
    console.log("==========================");
    res.json({ message: true, tempDistInfo }); */
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
