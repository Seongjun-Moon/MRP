ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
PEER0_ORG1_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
PEER0_ORG2_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
PEER0_ORG3_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt

verifyResult() {
  if [ $1 -ne 0 ]; then
    echo "!!!!!!!!!!!!!!! "$2" !!!!!!!!!!!!!!!!"
    echo "========= ERROR !!! FAILED to execute End-2-End Scenario ==========="
    echo
    exit 1
  fi
}

setGlobals() {
  PEER=$1
  ORG=$2
  if [ $ORG -eq 1 ]; then
    CORE_PEER_LOCALMSPID="Org1MSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.org1.example.com:7051
    fi
  elif [ $ORG -eq 2 ]; then
    CORE_PEER_LOCALMSPID="Org2MSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG2_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.org2.example.com:7051

    fi

  elif [ $ORG -eq 3 ]; then
    CORE_PEER_LOCALMSPID="Org3MSP"
    CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG3_CA
    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.example.com/users/Admin@org3.example.com/msp
    if [ $PEER -eq 0 ]; then
      CORE_PEER_ADDRESS=peer0.org3.example.com:9051
    fi
  else
    echo "================== ERROR !!! ORG Unknown =================="
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

## Sometimes Join takes time hence RETRY at least 5 times
joinChannelWithRetry() {
  PEER=$1
  ORG=$2
  setGlobals $PEER $ORG

  set -x
  peer channel join -b $CHANNEL_NAME.block >&log.txt
  res=$?
  set +x
  cat log.txt
  if [ $res -ne 0 -a $COUNTER -lt $MAX_RETRY ]; then
    COUNTER=$(expr $COUNTER + 1)
    echo "peer${PEER}.org${ORG} failed to join the channel, Retry after $DELAY seconds"
    sleep $DELAY
    joinChannelWithRetry $PEER $ORG
  else
    COUNTER=1
  fi
  verifyResult $res "After $MAX_RETRY attempts, peer${PEER}.org${ORG} has failed to join channel '$CHANNEL_NAME' "
}


installCCWithRetry() {
  PEER=$1
  ORG=$2
  CC_SRC_VERSION=$3
  setGlobals $PEER $ORG

echo "Installing smart contract on peer${PEER}.org${ORG}.example.com"

  peer chaincode install -n "$CC_SRC_NAME" -v $CC_SRC_VERSION -p "$CC_SRC_PATH" -l "$CC_RUNTIME_LANGUAGE" >&log.txt
  res=$?
  set +x
  cat log.txt

if [ $res -ne 0 -a $COUNTER -lt $MAX_RETRY ]; then
    COUNTER=$(expr $COUNTER + 1)
    echo "peer${PEER}.org${ORG} failed to install the chaincode, Retry after $DELAY seconds"
    sleep $DELAY
    installCCWithRetry $PEER $ORG
  else
    COUNTER=1
  fi
  verifyResult $res "After $MAX_RETRY attempts, peer${PEER}.org${ORG} has failed to failed to install the chaincode $CC_SRC_NAME "

}


instantiateCCWIthRetry() {
  PEER=0
  ORG=1
  setGlobals $PEER $ORG

echo "Instantiating smart contract on peer${PEER}.org${ORG}.example.com"
echo "Waiting for upgrade making block ..."

  peer chaincode instantiate \
    -C $CHANNEL_NAME \
    -n "$CC_SRC_NAME" \
    -l "$CC_RUNTIME_LANGUAGE" \
    -v $CC_SRC_VERSION \
    -c '{"Args":[]}' \
    -P "OR('Org1MSP.member','Org2MSP.member')" >&log.txt

 res=$?
  set +x
  cat log.txt

if [ $res -ne 0 -a $COUNTER -lt $MAX_RETRY ]; then
    COUNTER=$(expr $COUNTER + 1)
    echo "peer${PEER}.org${ORG} failed to instantiate the chaincode, Retry after $DELAY seconds"
    sleep $DELAY
    instantiateCCWIthRetry $PEER $ORG
  else
    COUNTER=1
  fi
  verifyResult $res "After $MAX_RETRY attempts, peer${PEER}.org${ORG} has failed to failed to instantiate the chaincode $CC_SRC_NAME "

echo "Waiting for instantiation request to be committed ..."
sleep 10

set +x


}

upgradeCCWIthRetry() {

  PEER=0
  ORG=1
  setGlobals $PEER $ORG

echo "upgrading smart contract on peer${peer}.org${org}.example.com"
echo "Waiting for upgrade making block ..."

  peer chaincode upgrade \
    -C $CHANNEL_NAME \
    -n "$CC_SRC_NAME" \
    -l "$CC_RUNTIME_LANGUAGE" \
    -v "$CC_SRC_VERSION" \
    -c '{"Args":[]}' \
    -P "OR('Org1MSP.member','Org2MSP.member')" >&log.txt

res=$?
  set +x
  cat log.txt

if [ $res -ne 0 -a $COUNTER -lt $MAX_RETRY ]; then
    COUNTER=$(expr $COUNTER + 1)
    echo "peer${PEER}.org${ORG} failed to upgrade the chaincode, Retry after $DELAY seconds"
    sleep $DELAY
    upgradeCCWIthRetry $PEER $ORG
  else
    COUNTER=1
  fi
  verifyResult $res "After $MAX_RETRY attempts, peer${PEER}.org${ORG} has failed to failed to upgrade the chaincode $CC_SRC_NAME "

echo "Waiting for upgrade request to be committed ..."
sleep 10

set +x

}



