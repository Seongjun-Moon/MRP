var { Component } = React;

class Main extends Component {
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
  queryAll = () => {
    axios
      .get('/queryAll')
      .then((response) => {
        alert(response.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <button onClick={this.connect}>네트워크 연결</button>
        <button onClick={this.queryAll}>모든 유통이력 조회</button>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
