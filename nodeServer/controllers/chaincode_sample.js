const fs = require("fs");
const path = require("path");
const FabricCAServices = require("fabric-ca-client");
const {
  FileSystemWallet,
  X509WalletMixin,
  Gateway,
} = require("fabric-network");

const Medicine = require("../models").Medicine;
const Barcode = require("../models").Barcode;

const ccpPath = path.resolve(
  __dirname,
  "..",
  "basic-2org-network",		// .env 파일로 이동
  "connection-org1.json"	// 세션에 있는 변수값으로 받음
);
const ccpJSON = fs.readFileSync(ccpPath, "utf8");
const ccp = JSON.parse(ccpJSON);

// 인증기관과 통신할 수 있는 객체 생성
const caURL = ccp.certificateAuthorities["ca.example.com"].url;
const ca = new FabricCAServices(caURL);

// 신원 증명서를 저장할 wallet 생성
const walletPath = path.join(process.cwd(), "wallet");
const wallet = new FileSystemWallet(walletPath);

// 체인코드
const chainCode = "CHAINCODE_NAME";	// .env 파일로 이동

// 채널
const channel = "CHANNEL_NAME";		// .env 파일로 이동

// ==================  GET Method ==================
// 1. MRP 블록체인 네트워크 연결 시도
const connect = async (req, res) => {
  try {
    console.log(`Wallet path: ${walletPath}`);
    // Check to see if we've already enrolled the admin user.
    const adminExists = await wallet.exists("admin");
    if (!adminExists) {
      // Enroll the admin user, and import the new identity into the wallet.
      const enrollment = await ca.enroll({
        enrollmentID: "admin",
        enrollmentSecret: "adminpw",
      });
      const identity = X509WalletMixin.createIdentity(
        "Org1MSP",
        enrollment.certificate,
        enrollment.key.toBytes()
      );
      wallet.import("admin", identity);
      console.log(
        'Successfully enrolled admin user "admin" and imported it into the wallet'
      );
    }

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists("user1");
    if (!userExists) {
      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: "admin",
        discovery: { enabled: false },
      });

      // Get the CA client object from the gateway for interacting with the CA.
      const ca = gateway.getClient().getCertificateAuthority();
      const adminIdentity = gateway.getCurrentIdentity();

      // Register the user, enroll the user, and import the new identity into the wallet.
      const secret = await ca.register(
        {
          affiliation: "org1.department1",
          enrollmentID: "user1",
          role: "client",
        },
        adminIdentity
      );
      const enrollment = await ca.enroll({
        enrollmentID: "user1",
        enrollmentSecret: secret,
      });
      const userIdentity = X509WalletMixin.createIdentity(
        "Org1MSP",
        enrollment.certificate,
        enrollment.key.toBytes()
      );
      wallet.import("user1", userIdentity);
      console.log(
        'Successfully registered and enrolled admin user "user1" and imported it into the wallet'
      );
    }
    res.json({ msg: "connected" });
  } catch (err) {
    console.log(err);
  }
};


// ==================  POST Method ==================
// 2. 전문의약품 유통정보 신규등록 (제조)
// front-end에서 barcode, companyCode, targetCompanyCode, state 순으로 인자 전달
const register = async (req, res) => {
  try {
    const userExists = await wallet.exists("user1");
    if (!userExists) {
      console.log(
        'An identity for the user "user1" does not exist in the wallet'
      );
      await res.json({ msg: "연결부터 해주세요" });
      return;
    }
    console.log("Start : Insert Medicine Info");
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "user1",
      discovery: { enabled: false },
    });
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channel);

    // Get the contract from the network.
    const contract = network.getContract(chainCode);

    // 유통이력 트랜잭션 생성
    await contract.submitTransaction(
      "register",
      `${req.body.barcode}`,
      `${req.body.companyId}`,
      `${req.body.targetId}`,
      `${req.body.state}`
    );
    console.log(`Transaction has been submit, result is: OK`);
    res.json({
      code: "1",
      msg: `${req.body.barcode}의 유통정보가 정상적으로 입력되었습니다`,
    });
  } catch (err) {
    console.log(err);
    res.json({ code: "0", msg: `${req.body.barcode} 입력 오류` });
  }
};

// 3. 전문의약품 유통정보 등록 (도매, 병원 및 약국)
// 기존 블록체인에 등록된 경우에만 정상 수행함
// front-end에서 barcode, companyCode, targetCompanyCode, state 순으로 인자 전달
const update = async (req, res) => {
  try {
    const userExists = await wallet.exists("user1");
    if (!userExists) {
      console.log(
        'An identity for the user "user1" does not exist in the wallet'
      );
      await res.json({ msg: "연결부터 해주세요" });
      return;
    }
    console.log("Start : Update Medicine Info");
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "user1",
      discovery: { enabled: false },
    });
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channel);

    // Get the contract from the network.
    const contract = network.getContract(chainCode);

    // Evaluate the specified transaction
    await contract.submitTransaction(
      "changeMediStatus",
      `${req.body.barcode}`,
      `${req.body.companyId}`,
      `${req.body.targetId}`,
      `${req.body.state}`
    );
    console.log(`Transaction has been evaluated, result is ok`);
    res.json({
      code: "1",
      msg: `${req.body.barcode}가 정상적으로 변경되었습니다`,
    });
  } catch (err) {
    console.log(err);
    res.json({ code: "0", msg: `${req.body.barcode} 기존 유통내역이 존재하지 않습니다.` });
  }
};

// 4. 단일 전문의약품의 현재 유통정보를 확인 (world state)
// front-end에서 barcode 1개를 인자로 전달
const getBarcode = async (req, res) => {
    try {
    const userExists = await wallet.exists('user1');
    if (!userExists) {
      console.log(
        'An identity for the user "user1" does not exist in the wallet'
      );
      await res.json({ msg: '연결부터 해주세요' });
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: 'user1',
      discovery: { enabled: false },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channel);

    // Get the contract from the network.
    const contract = network.getContract(chainCode);

    const result = await contract.evaluateTransaction(
      'getBarcode',
      `${req.body.barcode}`
    );
    const state = JSON.parse(result);
    res.json({state});

  } catch (err) {
    console.log(err);
  }

}


// 5. 표준코드에 대응하는 모든 바코드 항목을 조회
// front-end에서 mediCode(표준코드) 1개를 인자로 전달
const barcodeList = async (req, res) => {
  try {
    
    const arr = [];
    const barcodeList = await Barcode.findAll({
      attributes: ["barcodeName", "mediCode"],
      where: {
        mediCode: req.body.mediCode,
      },
    });
    // 대응되는 바코드 개수 (size)
    const size = Object.keys(barcodeList).length;
    for (let i = 0; i < size; i++) {
      console.log("barcord " + i + ":" + barcodeList[i].barcodeName);
      arr.push(barcodeList[i].barcodeName);
      console.log(barcodeList[i].barcodeName);
    }
    // 콜백함수 (블록체인 네트워크에 바코드별 최신 유통정보 조회)
    // showBarcodes([바코드 배열]);

    //res.json({ arr });
  } catch (err) {
    console.log(err);
  }
};

// 6. 각 바코드의 현재 유통상태 조회 (world state)
// ??? 에서 [barcode1,barcode2,...,]를 인자로 전달
const showBarcodes = async(req, res)=> {
   try{
    const mediCode = req.body;	// 바코드 배열
    console.log(mediCode);
    console.log(mediCode.toString());

    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "user1",
      discovery: { enabled: false },
    });
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channel);

    // Get the contract from the network.
    const contract = network.getContract(chainCode);

    const result = await contract.evaluateTransaction(
      "getAllBarcode",
      mediCode.toString()
    ); 
    console.log(result);
    const state = JSON.parse(result);
    res.json({state});
   }catch (err) {
    console.log(err);
   }

}); 

// 7. 특정 전문의약품의 유통 히스토리를 조회
// front-end에서 barcode 인자(1개) 전달
const history = async (req, res) => {
  try {
    const userExists = await wallet.exists("user1");
    if (!userExists) {
      console.log(
        'An identity for the user "user1" does not exist in the wallet'
      );
      await res.json({ msg: "연결부터 해주세요" });
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "user1",
      discovery: { enabled: false },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channel);

    // Get the contract from the network.
    const contract = network.getContract(chainCode);

    const result = await contract.evaluateTransaction(
      "getHistoryForMedicine",
      `${req.body.barcode}`
    );
    const history = JSON.parse(result);
    res.json({ history });
  } catch (err) {
    console.log(err);
  }
};


module.exports = { connect, queryAll, register, update, history, barcodeList };
