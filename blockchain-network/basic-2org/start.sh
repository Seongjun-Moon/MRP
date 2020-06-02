#!/bin/bash

set -ev

starttime=$(date +%s)

CC_SRC_NAME=${1}

#./bybn.sh $CC_SRC_NAME


# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

docker-compose -f docker-compose.yml down

docker-compose -f docker-compose.yml up -d orderer.example.com ca1.example.com ca2.example.com ca3.example.com ca4.example.com  peer0.org1.example.com couchdb cli peer0.org2.example.com peer0.org3.example.com peer0.org4.example.com db
docker ps

# wait for Hyperledger Fabric to start
# incase of errors when running later commands, issue export FABRIC_START_TIMEOUT=<larger number>
export FABRIC_START_TIMEOUT=10
#echo ${FABRIC_START_TIMEOUT}
sleep $FABRIC_START_TIMEOUT

# Create the channel
#docker exec cli peer channel create -o orderer.example.com:7050 -c mychannel -f ./channel.tx
docker exec cli peer channel create -o orderer.example.com:7050 -c mychannel -f ./channel.tx
#--tls --cafile /etc/hyperledger/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem

#docker exec cli scripts/script.sh 
docker exec cli scripts/script.sh $CC_SRC_NAME


