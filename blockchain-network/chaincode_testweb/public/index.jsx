var { Component } = React;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  handleChange = (event) => {
    this.setState({ productState: event.target.value });
  };

  // MRP 블록체인 네트워크 연결요청
  connect = () => {
    axios
      .get('/connect')
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 전문의약품 유통정보 등록
  register = () => {
    const flag = confirm(
      `아래 정보로 입력하시겠습니까?\n표준코드 : ${this.barcodeInput.value}\n회사코드: ${this.companyIdInput.value}\n대상업체코드: ${this.targetIdInput.value}\n유통상태: ${this.productStateInput.value}`
    );
    if (flag) {
      const sendParam = {
        barcode: this.barcodeInput.value,
        companyId: this.companyIdInput.value,
        targetId: this.targetIdInput.value,
        state: this.productStateInput.value,
      };
      axios
        .post('/register', sendParam)
        .then((response) => {
          alert(response.data.msg);
          this.barcodeInput.value = '';
          this.companyIdInput.value = '';
          this.targetIdInput.value = '';
          this.productStateInput.value = '입고';
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  // 기존 등록된 전문의약품의 최신 유통정보 등록요청
  update = () => {
    const flag = confirm(
      `아래 정보로 입력하시겠습니까?\n(기존 유통되지 않은 전문의약품은 등록불가)\n표준코드 : ${this.barcodeUpdate.value}\n회사코드: ${this.companyIdUpdate.value}\n대상업체코드: ${this.targetIdUpdate.value}\n유통상태: ${this.productStateUpdate.value}`
    );
    if (flag) {
      const sendParam = {
        barcode: this.barcodeUpdate.value,
        companyId: this.companyIdUpdate.value,
        targetId: this.targetIdUpdate.value,
        state: this.productStateUpdate.value,
      };
      axios
        .post('/update', sendParam)
        .then((response) => {
          alert(response.data.msg);
          this.barcodeUpdate.value = '';
          this.companyIdUpdate.value = '';
          this.targetIdUpdate.value = '';
          this.productStateUpdate.value = '입고';
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  // 모든 전문의약품의 최신 유통정보 조회요청
  queryAll = () => {
    axios
      .get('/queryAll')
      .then((response) => {
        if (response.data.msg) {
          alert(response.data.msg);
        } else {
          // console.log(response.data.allInfo);

          let result = JSON.parse(response.data.allInfo);
          console.log(typeof result[0]);

          let allComments = result.map((element) => {
            return (
              <div key={element.Key}>
                <table>
                  <tr>
                    <td>{element.Key}</td>
                    <td>{element.Record.companyID}</td>
                    <td>{element.Record.targetID}</td>
                    <td>{element.Record.state}</td>
                    <td>{element.Record.time}</td>
                  </tr>
                </table>
              </div>
            );
          });
          this.setState({ comments: allComments });
          console.log(this.state.comments);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 특정 전문의약품의 모든 유통이력 조회요청
  historyForMedicine = () => {
    alert(this.barcodeQeury.value);
    const barcode = { barcode: this.barcodeQeury.value };

    axios
      .post('/history', barcode)
      .then((response) => {
        console.log(response.data.history);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.connect} disabled>
          네트워크 연결
        </button>
        <br />
        <input
          placeholder="(ex) MEDI1"
          ref={(ref) => {
            this.barcodeInput = ref;
          }}
        />
        <input
          placeholder="(ex) COMPANY ID"
          ref={(ref) => {
            this.companyIdInput = ref;
          }}
        />
        <input
          placeholder="(ex) TARGET ID"
          ref={(ref) => {
            this.targetIdInput = ref;
          }}
        />
        <select
          ref={(ref) => {
            this.productStateInput = ref;
          }}
          onChange={this.handleChange}
        >
          <option>입고</option>
          <option>출고</option>
        </select>
        <button onClick={this.register}>
          전문의약품 유통정보 등록 (제조업체)
        </button>
        <br />
        <input
          placeholder="(ex) MEDI1"
          ref={(ref) => {
            this.barcodeUpdate = ref;
          }}
        />
        <input
          placeholder="(ex) COMPANY ID"
          ref={(ref) => {
            this.companyIdUpdate = ref;
          }}
        />
        <input
          placeholder="(ex) TARGET ID"
          ref={(ref) => {
            this.targetIdUpdate = ref;
          }}
        />
        <select
          ref={(ref) => {
            this.productStateUpdate = ref;
          }}
          onChange={this.handleChange}
        >
          <option>입고</option>
          <option>출고</option>
        </select>
        <button onClick={this.update}>
          전문의약품 유통정보 등록 (도매, 병원 및 약국)
        </button>
        <br />
        <button onClick={this.queryAll}>모든 의약품 유통이력 조회</button>
        <br />

        <div>{this.state.comments}</div>

        <br />
        <input
          placeholder="(ex) MEDI1"
          ref={(ref) => (this.barcodeQeury = ref)}
        />
        <button onClick={this.historyForMedicine}>유통 History 조회</button>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
