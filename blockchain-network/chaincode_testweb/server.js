const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use('/', require('./routes/chaincode'));

app.listen(3000, function () {
  console.log('chaincode test server(3000) ready...');
});
