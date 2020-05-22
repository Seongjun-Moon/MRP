#!/bin/bash

# import utils
. scripts/utils.sh

DELAY=3
MAX_RETRY=10
CHANNEL_NAME="mychannel"


verifyResult() {
  if [ $1 -ne 0 ]; then
    echo "!!!!!!!!!!!!!!! "$2" !!!!!!!!!!!!!!!!"
    echo "========= ERROR !!! FAILED to execute End-2-End Scenario ==========="
    echo
    exit 1
  fi
}

joinChannel () {
	for org in 1 2; do
	    peer=0
		joinChannelWithRetry $peer $org
		echo "===================== peer${peer}.org${org} joined channel '$CHANNEL_NAME' ===================== "
		sleep $DELAY
		echo
	   
	done
}


joinChannel


