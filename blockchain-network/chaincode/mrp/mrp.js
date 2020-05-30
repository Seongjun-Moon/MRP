/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

'use strict';
const shim = require('fabric-shim');
const util = require('util');

let Chaincode = class {

  // The Init method is called when the Smart Contract 'fabcar' is instantiated by the blockchain network
  // Best practice is to have any Ledger initialization in separate function -- see initLedger()
  async Init(stub) {
    console.info('=========== Instantiated fabcar chaincode ===========');
    return shim.success();
  }

  // The Invoke method is called as a result of an application request to run the Smart Contract
  // 'fabcar'. The calling application program has also specified the particular smart contract
  // function to be called, with arguments
  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);

    let method = this[ret.fcn];
    if (!method) {
      console.error('no function of name:' + ret.fcn + ' found');
      throw new Error('Received unknown function ' + ret.fcn + ' invocation');
    }
    try {
      let payload = await method(stub, ret.params, this);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }
  // 전문의약품의 최초 유통내역 추가 (최초 유통단계에서만 함수 실행 / 업체 : 제조사)
  async register(stub, args) {
    console.info('============= START : Register Medicine Info ===========');
    if (args.length != 4) {
      throw new Error('Incorrect number of arguments. Expecting 4');
    }
    let find = await stub.getState(args[0]);
    if (find && find.toString().length > 0) { 
        console.log(args[0] + ' already exist: ');
	return Buffer.from("false");
    }
    let time = new Date().toLocaleString();

    // Value 등록
    var Medicine = {
      companyID: args[1],
      targetID: args[2],
      time: time,
      state: args[3],
    };
    // Key 등록
    console.info(JSON.stringify(Medicine));
    let result = await stub.putState(args[0], Buffer.from(JSON.stringify(Medicine)));
    console.info('============= END : Register Medicine Info ===========');
    return Buffer.from("true");
  }

  // 기유통된 전문의약품의 유통내역 추가 (기존 블록체인에 등록된 바코드만 함수 실행 / 모든 업체)
  async changeMediStatus(stub, args) {
    console.info('============= START : update Medicine Status ===========');
    if (args.length != 4) {
        console.log('Incorrect number of arguments. Expecting 4');
	return Buffer.from("false");
    }true

    let mediAsBytes = await stub.getState(args[0]); //get the Medicine from chaincode state
    if (!mediAsBytes || mediAsBytes.toString().length <= 0) {
        console.log(mediCode + ' does not exist: ');
	return Buffer.from("false");
    }
    let medi = JSON.parse(mediAsBytes);
    let time = new Date().toLocaleString();
    medi.companyID = args[1];
    medi.targetID = args[2];
    medi.time = time;
    medi.state = args[3];

    await stub.putState(args[0], Buffer.from(JSON.stringify(medi)));
    console.info('============= END : update Medicine Status ===========');
    return Buffer.from("true");
  }
  
  // 하나의 바코드에서 최신 유통내역 조회 (world state)
  async getBarcode(stub, args) {
    if (args.length != 1) {
      console.log('Incorrect number of arguments. Expecting Barcode');
	return Buffer.from("false");
    }
    let barcode = args[0];

    let result = await stub.getState(barcode); //get the car from chaincode state
    if (!result || result.toString().length <= 0) {
      console.log(barcode + ' does not exist: ');
	return Buffer.from("false");
    }
    console.log(result.toString());
    return result;


  }

  // 바코드 항목(배열)으로 각 전문의약품의 유통내역 조회 (world state)
  async getAllBarcode(stub, args) {
    console.info('============= START : get all Mdeicine ===========');
    const codes=args[0].split(',');

    const resultAll=[];

    for(let i=0; i<codes.length; i++){
	let code = await stub.getState(codes[i]); 
	console.log(typeof(code));
	if (!code || code.toString().length <= 0) {
	    resultAll.push(JSON.parse('"does not exist"'));

	}else{
	    resultAll.push(JSON.parse(code.toString('utf8')));
	}
	console.log(code.toString());

    }
    console.log(resultAll);

    console.info('============= END : get all Mdeicine ===========');
   // return resultAll;
    return Buffer.from(JSON.stringify(resultAll));

  }

  // 하나의 바코드에서 유통이력 히스토리 조회 (blockchain)
  async getHistoryForMedicine(stub, args, thisClass) {
    if (args.length < 1) {
      throw new Error('Incorrect number of arguments. Expecting 1');
    }
    let key = args[0];
    console.info('- start getHistoryForMedicine: %s\n', key);

    let resultsIterator = await stub.getHistoryForKey(key);
    let method = thisClass['getAllResults'];
    let results = await method(resultsIterator, true);

    return Buffer.from(JSON.stringify(results));
  }

  async getAllResults(iterator, isHistory) {
    let allResults = [];
    while (true) {
      let res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};
        console.log(res.value.value.toString('utf8'));

        if (isHistory && isHistory === true) {
          jsonRes.TxId = res.value.tx_id;
          jsonRes.Timestamp = res.value.timestamp;
          jsonRes.IsDelete = res.value.is_delete.toString();
          try {
            jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
          } catch (err) {
            console.log(err);
            jsonRes.Value = res.value.value.toString('utf8');
          }
        } else {
          jsonRes.Key = res.value.key;
          try {
            jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
          } catch (err) {
            console.log(err);
            jsonRes.Record = res.value.value.toString('utf8');
          }
        }
        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await iterator.close();
        console.info(allResults);
        return allResults;
      }
    }
  }
  
};

shim.start(new Chaincode());
