const dotenv = require("dotenv")
const fs = require("fs")
const FabricCAServices = require("fabric-ca-client")
const { FileSystemWallet, X509WalletMixin, Gateway } = require("fabric-network")
const os = require("os")
const path = require("path")

const Medicine = require("../models").Medicine
const Barcode = require("../models").Barcode
const Temp = require("../models").Temp

const env = process.env

// 소속 식별을 위한 변수들
let companyMSP = ""

// 신원 증명서를 저장할 wallet 생성
let walletPath = ""
let wallet
let ccpPath = ""
// const walletPath = path.join(process.cwd(), "wallet")

// 체인코드
const chainCode = `${env.CHAINCODE_NAME}`

// 채널
const channel = `${env.CHANNEL_NAME}`

dotenv.config()
// ==================  GET Method ==================
// 1. MRP 블록체인 네트워크 연결 시도

// 소속 식별 변수들 주입
const IdentifyOrg = (i) => {
  return new Promise((resolve, reject) => {
    switch (i) {
      case 1:
        ;(companyMSP = "Org1MSP"), resolve()
        break
      case 2:
        ;(companyMSP = "Org2MSP"), resolve()
        break
      case 3:
        ;(companyMSP = "Org3MSP"), resolve()
        break
      case 4:
        ;(companyMSP = "Org4MSP"), resolve()
        break
      default:
        ;(companyMSP = "Org4MSP"), resolve()
    }
  })
}

const connect = async (req, res) => {
  for (let i = 1; i <= 4; i++) {
    await IdentifyOrg(i)
    try {
      walletPath = path.join(os.homedir(), "wallet" + i)
      wallet = new FileSystemWallet(walletPath)
      console.log(`Wallet path: ${walletPath}`)
      ccpPath = path.resolve(
        __dirname,
        "..",
        `${env.NETWORK_CONFIG}`,
        "connection-org" + i + ".json"
      )
      const ccpJSON = fs.readFileSync(ccpPath, "utf8")
      const ccp = JSON.parse(ccpJSON)
      const caURL = ccp.certificateAuthorities["ca" + i + ".example.com"].url
      const ca = new FabricCAServices(caURL)
      // Check to see if we've already enrolled the admin user.
      const adminExists = await wallet.exists("admin")
      if (!adminExists) {
        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({
          enrollmentID: `${env.ENROLLMENT_ID}`,
          enrollmentSecret: `${env.ENROLLMENT_SECRET}`,
        })
        const identity = X509WalletMixin.createIdentity(
          companyMSP, // session vriable
          enrollment.certificate,
          enrollment.key.toBytes()
        )
        await wallet.import("admin", identity)
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet')
      }

      // Check to see if we've already enrolled the user.
      const userExists = await wallet.exists("user1") // session company type
      console.log(userExists)
      if (!userExists) {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway()
        await gateway.connect(ccp, {
          wallet,
          identity: "admin",
          discovery: { enabled: false },
        })
        console.log("setting gateway")
        // Get the CA client object from the gateway for interacting with the CA.
        const caR = gateway.getClient().getCertificateAuthority()
        const adminIdentity = gateway.getCurrentIdentity()

        // Register the user, enroll the user, and import the new identity into the wallet.
        console.log("setting caR")
        const secret = await caR.register(
          {
            //affiliation: companyAffiliation, // session vriable
            enrollmentID: "user1", // session companyType
            role: "client", //
          },
          adminIdentity
        )
        console.log("setting sercet")
        const enrollment = await caR.enroll({
          enrollmentID: "user1", // session companyType
          enrollmentSecret: secret,
        })
        console.log("enrollment")
        const userIdentity = X509WalletMixin.createIdentity(
          companyMSP, // session MSP
          enrollment.certificate,
          enrollment.key.toBytes()
        )
        console.log("setting userIdentity")
        await wallet.import("user1", userIdentity)
        console.log(
          `Successfully registered and enrolled admin user "user1" and imported it into the wallet`
        )
      }
    } catch (err) {
      console.log(err)
      res.json({ message: false })
    }
  }
  res.json({ message: true })
}

// ==================  POST Method ==================

const sendDB = async (barcode) => {
  const mediCode = barcode.substring(4, 17)
  try {
    const veryifyMediCode = await Medicine.findOne({
      where: { mediCode },
    })
    if (!veryifyMediCode) {
      console.log("isn't registered")
      return false
    } else {
      try {
        await Barcode.create({
          barcodeName: barcode,
          mediCode,
        })
        console.log("insert barcode")
        return true
      } catch (err) {
        //console.log(err)
        return true
      }
    }
  } catch (err) {
    //console.log(err)
    return false
  }
}

const sendBlockchain = async (tempData, companyType) => {
  const stringTempData = JSON.stringify(tempData)
  try {
    await selectWallet(companyType)
    wallet = new FileSystemWallet(walletPath)
    const userExists = await wallet.exists("user1")
    if (!userExists) {
      console.log(`An identity for the user ${companyType} does not exist in the wallet`)
      return false
    }
    console.log("Start : Update Medicine Info")
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway()
    await gateway.connect(ccpPath, {
      wallet,
      identity: "user1",
      discovery: { enabled: false },
    })
    console.log("created gateway")
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channel)
    console.log("created network")
    // Get the contract from the network.
    const contract = network.getContract(chainCode)
    console.log("created contract")

    // Evaluate the specified transaction
    const UpdateResult = await contract.submitTransaction("changeMediStatus", stringTempData)
    if (UpdateResult.toString() == "true") {
      console.log(`Transaction has been evaluated, result is ok`)
    } else {
      console.log("Transaction faile")
    }
    return true
  } catch (err) {
    //console.log(err)
    return false
  }
}

const selectWallet = (companyName) => {
  return new Promise((resolve, reject) => {
    switch (companyName) {
      case "oversee":
        //companyType = "wallet1"
        walletPath = path.join(os.homedir(), "wallet1")

        console.log(`Wallet path: ${walletPath}`)
        ccpPath = path.resolve(__dirname, "..", `${env.NETWORK_CONFIG}`, "connection-org1.json")
        resolve()
        break
      case "manufacturer":
        walletPath = path.join(os.homedir(), "wallet2")
        console.log(`Wallet path: ${walletPath}`)
        ccpPath = path.resolve(__dirname, "..", `${env.NETWORK_CONFIG}`, "connection-org2.json")
        resolve()
        break
      case "distributor":
        walletPath = path.join(os.homedir(), "wallet3")
        console.log(`Wallet path: ${walletPath}`)
        ccpPath = path.resolve(__dirname, "..", `${env.NETWORK_CONFIG}`, "connection-org3.json")
        resolve()
        break
      case "hospital":
        walletPath = path.join(os.homedir(), "wallet4")
        console.log(`Wallet path: ${walletPath}`)
        ccpPath = path.resolve(__dirname, "..", `${env.NETWORK_CONFIG}`, "connection-org4.json")
        resolve()
        break
      default:
        walletPath = path.join(os.homedir(), "wallet4")
        console.log(`Wallet path: ${walletPath}`)
        ccpPath = path.resolve(__dirname, "..", `${env.NETWORK_CONFIG}`, "connection-org4.json")
        resolve()
    }
  })
}

// 2. 전문의약품 유통정보 등록 (도매, 병원 및 약국)
const update = async (req, res) => {
  const companyType = req.session.companyType
  const companyCode = req.session.companyCode
  // const companyType = "hospital"
  try {
    const tempData = await Temp.findAll({
      attributes: ["barcode", "companyCode", "targetCompanyCode", "state", "description"],
      //where: { companyCode },
    })
    // console.log(tempData)
    let index = 0
    console.log("===============================================================================")
    console.log(tempData)
    while (index < tempData.length) {
      let varify = await sendDB(tempData[index].dataValues.barcode)
      if (varify) {
        index++
      } else {
        tempData.splice(index, 1)
      }
    }
    //tempData.forEach((element) => {await sendDB(element.barcode)})
    console.log("block : " + tempData)
    console.log(tempData[0].dataValues.barcode)
    const result = await sendBlockchain(tempData, companyType)
    console.log(result)

    await Temp.destroy({where: {}})

    if (result) {
      res.json({ message: true })
    } else {
      res.json({ message: false })
    }
  } catch (err) {
    console.log(err)
    res.json({ message: false })
  }
}

// 3. 단일 전문의약품의 현재 유통정보를 확인 (world state)
// front-end에서 barcode 1개를 인자로 전달
const getBarcode = async (req, res) => {
  const companyType = req.session.companyType
  //console.log(req.body.barcode)
  try {
    await selectWallet(companyType)
    wallet = new FileSystemWallet(walletPath)
    const userExists = await wallet.exists("user1")
    if (!userExists) {
      console.log(`An identity for the user ${companyType} does not exist in the wallet`)
      return false
    }
    console.log("Start : Update Medicine Info")
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway()
    await gateway.connect(ccpPath, {
      wallet,
      identity: "user1",
      discovery: { enabled: false },
    })
    console.log("created gateway")
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channel)
    console.log("created network")
    // Get the contract from the network.
    const contract = network.getContract(chainCode)
    console.log("created contract")

    //const result = await contract.evaluateTransaction("getBarcode", "(01)8806920000104(21)12345678")
    const result = await contract.evaluateTransaction("getBarcode", `${req.body.barcode}`)
    const state = JSON.parse(result)
    console.log(result.toString())
    res.json({ state })
  } catch (err) {
    console.log(err)
  }
}

// 4. 표준코드에 대응하는 모든 바코드 항목을 조회
// front-end에서 mediCode(표준코드) 1개를 인자로 전달
const barcodeList = async (req, res) => {
  const companyType = req.session.companyType
  try {
    await selectWallet(companyType)
    wallet = new FileSystemWallet(walletPath)
    const userExists = await wallet.exists("user1")
    if (!userExists) {
      console.log(`An identity for the user ${companyType} does not exist in the wallet`)
      return false
    }
    console.log("Start : get barcode list")

    const barcodeList = []
    const barcodeResultList = await Barcode.findAll({
      attributes: ["barcodeName", "mediCode"],
      where: {
        mediCode: `${req.body.mediCode}`,
        //mediCode: "8806920000104",
      },
    })
    // 대응되는 바코드 개수 (size) //forEach
    const size = Object.keys(barcodeResultList).length
    for (let i = 0; i < size; i++) {
      console.log("barcord " + i + ":" + barcodeResultList[i].barcodeName)
      barcodeList.push(barcodeResultList[i].barcodeName)
      console.log(barcodeResultList[i].barcodeName)
    }
    // 콜백함수 (블록체인 네트워크에 바코드별 최신 유통정보 조회)
    //showBarcodes(arr)

    const gateway = new Gateway()
    await gateway.connect(ccpPath, {
      wallet,
      identity: "user1",
      discovery: { enabled: false },
    })
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channel)

    // Get the contract from the network.
    const contract = network.getContract(chainCode)

    const result = await contract.evaluateTransaction("getAllBarcode", barcodeList.toString())
    console.log(result.toString())
    //console.log("================================================================")
    const state = JSON.parse(result)
    const resultArr = []
    console.log(state)
    state.forEach((element, index) => {
      resultArr.push(element)
    })
    //res.json({ resultArr })
    res.json({ barcodeList, resultArr })
  } catch (err) {
    console.log(err)
    res.json({ state: "fail" })
  }
}

// 5. 각 바코드의 현재 유통상태 조회 (world state)
// ??? 에서 [barcode1,barcode2,...,]를 인자로 전달
//비동기로 인해서 따로 함수로 사용하지 않고 barcodeList 안에서 직접 실행
/*  
const showBarcodes = async (arr) => {
  try {
    const mediCode = arr // 바코드 배열
    console.log(mediCode)
    console.log(mediCode.toString())

    const gateway = new Gateway()
    await gateway.connect(ccpPath, {
      wallet,
      identity: "user1",
      discovery: { enabled: false },
    })
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channel)

    // Get the contract from the network.
    const contract = network.getContract(chainCode)

    const result = await contract.evaluateTransaction("getAllBarcode", mediCode.toString())
    console.log(result)
    const state = JSON.parse(result)
    resultState = state
  } catch (err) {
    console.log(err)
  } finally {
    resultState = "fail"
  }
}*/

// 6. 특정 전문의약품의 유통 히스토리를 조회
// front-end에서 barcode 인자(1개) 전달
const history = async (req, res) => {
  const companyType = req.session.companyType
  try {
    await selectWallet(companyType)
    wallet = new FileSystemWallet(walletPath)
    const userExists = await wallet.exists("user1")
    if (!userExists) {
      console.log(`An identity for the user ${companyType} does not exist in the wallet`)
      return false
    }
    console.log("Start : Update Medicine Info")
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway()
    await gateway.connect(ccpPath, {
      wallet,
      identity: "user1",
      discovery: { enabled: false },
    })
    console.log("created gateway")
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channel)
    console.log("created network")
    // Get the contract from the network.
    const contract = network.getContract(chainCode)
    console.log("created contract")

    const result = await contract.evaluateTransaction(
      "getHistoryForMedicine",
      `${req.body.barcode}`
      //"(01)8806920000104(21)12345678"
    ) 
  
    const history = JSON.parse(result)
    const resultArr = []
    console.log(history)
    history.forEach((element) => {
      resultArr.push(element.Value)
    })
    res.json({ resultArr })
  } catch (err) {
    console.log(err)
  }
}

module.exports = { connect, update, getBarcode, history, barcodeList }
