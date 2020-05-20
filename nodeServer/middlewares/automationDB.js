const mysql = require("mysql");
const dotenv = require("dotenv");
const sequelize = require("../models").sequelize;
const medicineData = require("../datas/medicineData.json");
const companyData = require("../datas/companyData.json");
const Company = require("../models").Company;
const Medicine = require("../models").Medicine;

dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const automationDB = sequelize
  .sync({ force: false }) // force가 true면 db 갱신, false면 db 유지
  .then(() => {
    console.log(`----- DB가 존재 합니다. 정상 실행 됐습니다. -----`);
  })
  .catch((err) => {
    console.log(`----- DB가 존재하지 않습니다. DB를 생성합니다. -----`);
    const createSchemaSql = `CREATE DATABASE ${process.env.DATABASE}`;
    con.query(createSchemaSql, (error, result) => {
      if (error) {
        console.log(error);
      } else if (result) {
        console.log(`----- DB가 생성되었습니다. -----`);
        sequelize
          .sync({ force: false })
          .then(() => {
            companyData.forEach(async (companyElements) => {
              try {
                await Company.create({
                  companyCode: companyElements.companyCode,
                  companyName: companyElements.companyName,
                  companyType: companyElements.companyType,
                });
              } catch (err) {
                console.log(err);
              }
            });
            medicineData.forEach(async (medicineElements) => {
              try {
                await Medicine.create({
                  mediCode: medicineElements.mediCode,
                  companyCode: medicineElements.companyCode,
                  mediName: medicineElements.mediName,
                  mediType: medicineElements.mediType,
                  count: Number.parseInt(medicineElements.count),
                  permissionDate: medicineElements.permissionDate,
                  cancelDate: medicineElements.cancelDate,
                });
              } catch (err) {
                console.log(err);
              }
            });
            console.log(`----- DB를 생성 후 가동 중 입니다. -----`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });

module.exports = automationDB;
