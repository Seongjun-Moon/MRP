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
    console.info('=========== Instantiated test chaincode ===========');
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

  // 전문의약품 유통내역 등록 (출고, 입고)
  async register(stub, args) {
    console.info('============= START : Register Medicine Info ===========');
    if (args.length != 4) {
      throw new Error('Incorrect number of arguments. Expecting 4');
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
    await stub.putState(args[0], Buffer.from(JSON.stringify(Medicine)));
    console.info('============= END : Register Medicine Info ===========');
  }

  // 기유통된 전문의약품의 유통내역 추가
  async changeMediStatus(stub, args) {
    console.info('============= START : update Medicine Status ===========');
    if (args.length != 4) {
      throw new Error('Incorrect number of arguments. Expecting 4');
    }

    let mediAsBytes = await stub.getState(args[0]); //get the Medicine from chaincode state
    if (!mediAsBytes || mediAsBytes.toString().length <= 0) {
      throw new Error(mediCode + ' does not exist: ');
    }
    let medi = JSON.parse(mediAsBytes);
    let time = new Date().toLocaleString();
    medi.companyID = args[1];
    medi.targetID = args[2];
    medi.time = time;
    medi.state = args[3];

    await stub.putState(args[0], Buffer.from(JSON.stringify(medi)));
    console.info('============= END : update Medicine Status ===========');
  }

  // 특정 전문의약품의 유통내역 조회 (최신상태)
  async queryOneMedicine(stub, args) {
    if (args.length != 1) {
      throw new Error(
        'Incorrect number of arguments. Expecting CarNumber ex: MEDI0'
      );
    }
    let mediCode = args[0];
    let allResults = [];
    let result = {};
    let mediAsBytes = await stub.getState(mediCode); //get the Medicine from chaincode state
    if (!mediAsBytes || mediAsBytes.toString().length <= 0) {
      throw new Error(mediCode + ' does not exist: ');
    }
    result.Key = mediCode;
    result.Record = JSON.parse(mediAsBytes.toString());
    allResults.push(result);
    // console.log(mediAsBytes.toString());
    // return mediAsBytes;

    console.info(allResults);
    return Buffer.from(JSON.stringify(allResults));
  }

  // 모든 전문의약품 유통내역 조회 (최신상태)
  async showAll(stub, args) {
    let startKey = 'MEDI0';
    let endKey = 'MEDI999';

    let iterator = await stub.getStateByRange(startKey, endKey);

    let allResults = [];
    while (true) {
      let res = await iterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};
        console.log(res.value.value.toString('utf8'));

        jsonRes.Key = res.value.key;
        try {
          jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
        } catch (err) {
          console.log(err);
          jsonRes.Record = res.value.value.toString('utf8');
        }
        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await iterator.close();
        console.info(allResults);
        return Buffer.from(JSON.stringify(allResults));
      }
    }
  }
};

shim.start(new Chaincode());

