// 모듈
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");

// 미들웨어
const automationDB = require("./middlewares/automationDB");

// 라우터
const chaincodeRouter = require("./routers/chaincodeRouter");
const distributorRouter = require("./routers/distributorRouter");
const hospitalRouter = require("./routers/hospitalRouter");
const manufacturerRouter = require("./routers/manufacturerRouter");
const overseeRouter = require("./routers/overseeRouter");
const userRouter = require("./routers/userRouter");

// 상수, 변수 선언
const app = express();
const env = process.env;
const corsOptions = {
  origin: true,
  credentials: true,
};

<<<<<<< HEAD
const app = express();
const env = process.env;

dotenv.config();
automationDB;
app.use(express.static(path.join(__dirname, 'public')));
=======
dotenv.config();
automationDB;
app.use(express.static(path.join(__dirname, "public")));
>>>>>>> 171914aa4c8a37ae0d5cacb46ca0a119317abdf8
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
<<<<<<< HEAD
app.use('/user', require('./routers/userRouter'));
app.use('/distributor', require('./routers/distributorRouter'));
app.use('/hospital', require('./routers/hospitalRouter'));
app.use('/manufacture', require('./routers/manufacturerRouter'));
app.use('/oversee', require('./routers/overseeRouter'));
app.use('/chaincode', require('./routers/chaincodeRouter'));
=======
app.use("/user", userRouter);
app.use("/distributor", distributorRouter);
app.use("/hospital", hospitalRouter);
app.use("/manufacture", manufacturerRouter);
app.use("/oversee", overseeRouter);
app.use("/chaincode", chaincodeRouter);
>>>>>>> 171914aa4c8a37ae0d5cacb46ca0a119317abdf8

app.listen(env.PORT, () => {
  console.log(`MRP Node Server${env.PORT} listen...`);
});
