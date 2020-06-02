/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', 'connection-org2.json');

async function main() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user2');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user2', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('mrp-two');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
	
	const a=[];
	a.push(111);
	a.push(222);


        const result = await contract.evaluateTransaction('getAllBarcode', a.toString());
	//console.log(`Transaction has been evaluated, result is: ${result}`);
	console.log(result.toString());
	console.log(typeof(result));

/*
	const a=[];
	a.push({barcode:"111", companyID:"A3", targetID:"L2", state:"out", description:"test"});
	a.push({barcode:"222", companyID:"B3", targetID:"K2", state:"in", description:"return"});
 	const result = await contract.submitTransaction('changeMediStatus',JSON.stringify(a));
	if(result.toString()=="true"){
            console.log(`Transaction has been evaluated, result is: true`);
	    console.log(result.toString());
	    console.log(result);	
	    console.log(typeof(result));
	}else{
            console.log("fail");
	}

	await gateway.disconnect(); */


    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();
