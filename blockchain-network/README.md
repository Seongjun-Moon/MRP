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

- 전문의약품 정보를 입력
- barCode : 바코드 정보 (key)
- companyID : 로그인한 사용자가 속한 업체코드 (로그인 시 자동입력)
- targetID : 대상 업체코드 (수동입력)
- state : 유통상태 (수동입력, 출고/입고)
  
- [example]
- peer chaincode invoke -n [체인코드명] -c '{"Args":["register","MEDI1","업체코드","업체코드","유통상태"]}' -C mychannel

### changeMediStatus(barCode, companyID, targetID, state)

- 기존 블록체인에 등록된 전문의약품에 새로운 유통이력을 추가
- barCode : 바코드 정보 (key)
- companyID : 로그인한 사용자가 속한 업체코드 (로그인 시 자동입력)
- targetID : 대상 업체코드 (수동입력)
- state : 유통상태 (수동입력, 출고/입고)

### getHistoryForMedicine(barCode)

- 특정 전문의약품의 모든 유통이력(history)를 확인
- barCode : 바코드 정보 (key)

