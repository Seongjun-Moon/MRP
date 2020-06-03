const bcrypt = require("bcrypt");
const company = require("../models").Company;
const user = require("../models").User;

// user 정보 조회

const userInfo = async (req, res) => {
  try {
    const userInfo = await user.findAll({
      attributes: ["id", "companyCode"],
      include: {
        model: company,
        attributes: ["companyType", "companyName"],
      },
    });
    console.log(userInfo);

    res.json({
      message: true,
      userInfo,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

//로그아웃
const logout = async (req, res) => {
  req.session.destroy(() => {
    res.json({ message: true });
  });
};

// 로그인
const signIn = async (req, res) => {
  const id = req.body.id;
  const password = req.body.pw;
  try {
    const signIn = await company.findOne({
      // join => user table + company table
      attributes: ["companyType", "companyCode"],
      include: {
        model: user,
        attributes: ["companyCode", "password"],
        where: { id },
      },
    });
    console.log("/////////////////////////////////////////////////////");
    console.log(signIn.companyType);
    console.log(signIn.companyCode);
    console.log("/////////////////////////////////////////////////////");
    const comparePassword = await bcrypt.compare(
      password,
      signIn.users[0].password
    );
    if (comparePassword) {
      req.session.companyType = signIn.companyType;
      req.session.companyCode = signIn.companyCode;
      res.json({
        message: true,
        companyType: signIn.companyType,
        companyCode: signIn.companyCode,
      });
    } else {
      res.json({ message: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

// 회원가입
const signUp = async (req, res) => {
  const id = req.body.id;
  const password = req.body.pw;
  const companyCode = req.body.companyCode;
  const hash = await bcrypt.hash(password, 12);

  try {
    const getCompanyCode = await company.findOne({
      where: { companyCode },
    });
    console.log(getCompanyCode);
    if (!getCompanyCode) {
      res.json({ message: false });
    } else {
      try {
        const signUp = await user.create({
          id,
          password: hash,
          companyCode,
        });

        console.log(signUp);
        res.json({ message: id });
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

const myPage = async (req, res) => {
  const id = req.body.id;
  const password = req.body.changePw;
  const hash = await bcrypt.hash(password, 12);

  try {
    const changePassword = await user.update(
      {
        password: hash,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
};

module.exports = { userInfo, logout, signIn, signUp, myPage };
