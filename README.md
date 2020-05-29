## MRP (Medicine Resource Planning) 프로젝트

### 프로젝트 개요

1.1. 프로젝트명 및 기간

- 프로젝트 명 : 블록체인 기반 전문의약품 유통 및 추적 서비스
- 프로젝트 기간 : 2020.04.29 ~ 2020.06.04 (1 개월)

---

1.2. 프로젝트 목표

- Hyperledger Fabric 네트워크 환경에서 전문의약품 유통정보를 블록체인에 저장 및 조회
- 기존의 번거롭고 어렵던 전문의약품 유통정보에 대한 확인 절차를 간소화하기 위한 웹/앱 서비스 구현

### 구현기능

### 화면

### 유통이력 관련 요청/응답 방식

#### POST method

---

#### 1. (/chaincode/register) 전문의약품 유통정보 최초등록

##### 수행주체 : 제조사

##### Request

| name               | type   | description                     | required |
| ------------------ | ------ | ------------------------------- | -------- |
| barcode            | String | 전문의약품 바코드               | O        |
| companyCode        | String | 이력등록을 시도하는 업체의 코드 | O        |
| targetCompandyCode | String | 이력 관련된 타 업체의 코드      | O        |
| state              | String | 유통상태                        | O        |

##### Response

| name | type   | description                                         |
| ---- | ------ | --------------------------------------------------- |
| code | String | 정상적으로 수행 완료 시 '1' 리턴                    |
| msg  | String | \${barcode}의 유통정보가 정상적으로 입력되었습니다. |

#### 2. (/chaincode/update) 전문의약품 유통정보 등록

##### 수행주체 : 모든 사용자

- 기존 블록체인에 등록되지 않은 것에 대해서는 Error 리턴

##### Request

| name               | type   | description                     | required |
| ------------------ | ------ | ------------------------------- | -------- |
| barcode            | String | 전문의약품 바코드               | O        |
| companyCode        | String | 이력등록을 시도하는 업체의 코드 | O        |
| targetCompandyCode | String | 이력 관련된 타 업체의 코드      | O        |
| state              | String | 유통상태                        | O        |

##### Response

| name | type   | description                                                                                                                 |
| ---- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| code | String | 정상적으로 수행 완료 시 '1'을 리턴. 기존 유통이력이 없으면 '0' 리턴                                                         |
| msg  | String | (정상 수행) ${barcode}의 유통정보가 정상적으로 변경되었습니다. (비정상 수행) \${barcode} 기존 유통내역이 존재하지 않습니다. |

#### 3. (/chaincode/getBarcode) 단일 전문의약품의 현재 유통정보 조회

##### 수행주체 : 모든 사용자

##### Request

| name    | type   | description       | required |
| ------- | ------ | ----------------- | -------- |
| barcode | String | 전문의약품 바코드 | O        |

##### Response

| name               | type   | description                     |
| ------------------ | ------ | ------------------------------- |
| companyCode        | String | 이력등록을 시도하는 업체의 코드 |
| targetCompandyCode | String | 이력 관련된 타 업체의 코드      |
| state              | String | 유통상태                        |
| time               | String | 등록시간                        |

#### 4. (/chaincode/history) 단일 전문의약품의 모든 유통내역을 조회

##### 수행주체 : 모든 사용자

##### Request

| name    | type   | description       | required |
| ------- | ------ | ----------------- | -------- |
| barcode | String | 전문의약품 바코드 | O        |

##### Response

| name               | type   | description                     |
| ------------------ | ------ | ------------------------------- |
| companyCode        | String | 이력등록을 시도하는 업체의 코드 |
| targetCompandyCode | String | 이력 관련된 타 업체의 코드      |
| state              | String | 유통상태                        |
| time               | String | 등록시간                        |

#### 5. (/chaincode/barcodeList) 표준코드에 포함되는 바코드 항목들을 조회

##### 수행주체 : 모든 사용자

- 내부적으로 showBarcodes 메소드 호출
- showBarcodes : 각 바코드의 현재 유통상태를 조회 (world state)

##### Request

| name     | type   | description         | required |
| -------- | ------ | ------------------- | -------- |
| mediCode | String | 전문의약품 표준코드 | O        |

##### Response

| name               | type   | description                     |
| ------------------ | ------ | ------------------------------- |
| companyCode        | String | 이력등록을 시도하는 업체의 코드 |
| targetCompandyCode | String | 이력 관련된 타 업체의 코드      |
| state              | String | 유통상태                        |
| time               | String | 등록시간                        |
