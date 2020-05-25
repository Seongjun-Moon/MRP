#!/bin/bash


set -ev


CC_SRC_NAME=${1}
CC_SRC_VERSION=${2}

#docker exec cli scripts/update.sh $CC_SRC_NAME $CC_SRC_VERSION
docker exec cli scripts/update.sh $CC_SRC_NAME $CC_SRC_VERSION
