const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const FabricCAServices = require('fabric-ca-client');
const { FileSystemWallet, X509WalletMixin } = require('fabric-network');

router.get('/', (req, res) => {
  res.json({ msg: 'ok' });
});

module.exports = router;
