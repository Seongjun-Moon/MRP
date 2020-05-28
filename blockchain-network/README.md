## 블록체인 실행 쉘스크립트 명령어

#### start.sh 위치

MRP/blockchain-network/basic-2org/

#### 실행 명령어

./start.sh [chaincode name]

- 아규먼트로 체인코드 수정시 적용하려고 할 때 체인코드 이름을 간편하게 바꾸기 위해서 아규먼트를 받아 체인코드 이름을 수정한다.

#### updateCC.sh 명령어
./updateCC.sh [chaincode name] [version]

- 첫번째 아규먼트로 체인코드 이름(업그레이드 하려는 체인코드 이름과 동일해야 한다)
- 두번째 아규먼트는 해당 체인코드의 버전(이전에 인스톨한적 있는 버전과 동일한 버전을 입력할 경우 인스톨 실패한다)


## 체인코드 명령어

### showAll()

- 블록체인에 저장된 모든 값 조회 (트랜잭션 생성 순으로 정렬)

### register(barCode, companyID, targetID, state)

- 전문의약품의 최초 유통시 정보를 입력
- 함수를 호출하는 주체 : 제약회사
- barCode : 바코드 정보 (key)
- companyID : 로그인한 사용자가 속한 업체코드 (로그인 시 자동입력)
- targetID : 대상 업체코드 (수동입력)
- state : 유통상태 (수동입력, 출고/입고)
  
- [cli command example]
- peer chaincode invoke -n [체인코드명] -c '{"Args":["register","바코드","업체코드","업체코드","유통상태"]}' -C mychannel

### changeMediStatus(barCode, companyID, targetID, state)드

- 기존 블록체인에 등록된 전문의약품에 새로운 유통이력을 추가
- 함수를 호출하는 주체 : 제약회사, 도매회사, 약국 및 병원
- barCode : 바코드 정보 (key)
- companyID : 로그인한 사용자가 속한 업체코드 (로그인 시 자동입력)
- targetID : 대상 업체코드 (수동입력)
- state : 유통상태 (수동입력, 출고/입고)

- [cli command example]
- peer chaincode invoke -n [체인코드명] -c '{"Args":["changeMediStatus","바코드","업체코드","업체코드","유통상태"]}' -C mychannel

### getBarcode(barCode)

- 하나의 바코드 정보로 최신 유통상태를 조회
- 함수를 호출하는 주체 : 모든 사용자
- barCode : 바코드 정보 (key)

- [cli command example]
- peer chaincode query -n [체인코드명] -c '{"Args":["getBarcode","바코드"]}' -C mychannel

### getAllBarcode(barCode1,barCode2,...)

- 바코드 배열로 담은 후, 문자열 변환(toString)후 인자로 전달
- 해당하는 바코드에 대한 최신 유통상태를 조회
- 함수를 호출하는 주체 : 모든 사용자
- barCode : 바코드 정보(key)

- [cli command example]
- peer chaincode query -n [체인코드명] -c '{"Args":["getAllBarcode","바코드1,바코드2,..."]}' -C mychannel

### getHistoryForMedicine(barCode)

- 하나의 바코드 정보로 모든 유통이력 히스토리를 조회 (world state)
- 함수를 호출하는 주체 : 모든 사용자
- barCode : 바코드 정보 (key)

- [cli command example]
- peer chaincode query -n [체인코드명] -c '{"Args":["getHistoryForMedicine","바코드"]}' -C mychannel
