const bcrypt = require("bcrypt");
const company = require("../models").Company;
const user = require("../models").User;

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

module.exports = { logout, signIn, signUp };
