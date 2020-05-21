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

  // 블록 초기화
  async initLedger(stub, args) {
    console.info('============= START : Initialize Ledger ===========');
    let medicines = [];
    medicines.push({
      companyID: '1',
      targetID: '2',
      time: Date.now(),
      state: '4',
    });

    for (let i = 0; i < medicines.length; i++) {
      // cars[i].docType = 'car';
      await stub.putState(
        'MEDI' + i,
        Buffer.from(JSON.stringify(medicines[i]))
      );
      console.info('Added <--> ', medicines[i]);
    }
    console.info('============= END : Initialize Ledger ===========');
  }

  // 전문의약품 유통내역 등록 (출고, 입고)
  async registerMedi(stub, args) {
    console.info('============= START : Register Medicine Info ===========');
    if (args.length != 5) {
      throw new Error('Incorrect number of arguments. Expecting 5');
    }
    // Value 등록
    var Medicine = {
      companyID: args[1],
      targetID: args[2],
      time: args[3],
      state: args[4],
    };
    // Key 등록
    console.info(JSON.stringify(Medicine));
    await stub.putState(args[0], Buffer.from(JSON.stringify(Medicine)));
    console.info('============= END : Register Medicine Info ===========');
  }

  // 모든 전문의약품 유통내역 조회
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

