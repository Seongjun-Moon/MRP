## 블록체인 실행 쉘스크립트 명령어

#### start.sh 위치

MRP/blockchain-network/basic-2org/

#### 실행 명령어

./start.sh [chaincode version]

- 1은 아규먼트로 체인코드 수정시 적용하려고 할 때 체인코드 이름을 간편하게 바꾸기 위해서 아규먼트를 받아 체인코드 이름을 수정한다.
- 1은 임의의 값으로 스크립트를 실행할 때 마다 다른 값으로 바꿔 준다
- 숫자 이외에 문자도 가능 ( ./start.sh 2 , ./start.sh a 모두 다 가능)

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

### queryOneMedicine(barCode)
- 특정 전문의약품에 대한 의약품 유통정보를 조회 (최신 상태값)
- barCode : 바코드 정보 (key)
- (추가 검토) 모든 전문의약품 정보 조회는 getHistoryForKey 메소드 활용

