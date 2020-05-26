const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const cors = require('cors');

const corsOptions = {
  origin: true,
  credentials: true,
};

const app = express();
const env = process.env;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use('/chaincode', require('./routers/chaincodeRouter'));

app.listen(4000, () => {
  console.log(`Blockchain Server 4000 listen...`);
});
