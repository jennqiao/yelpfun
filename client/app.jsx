import ReactDom from 'react-dom';
import React from 'react';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.fetchData = this.fetchData.bind(this);

  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData () {
    // fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
    // .then((response) => response.json())
    // .then( (response) => {
    //   this.handleData(response.bpi);
    // })
    // .catch((err) => {
    //   console.log('here is err', err)
    // })
  }

  // handleData (data) {
  //   let dates = Object.keys(data);
  //   let prices = dates.map((date) => {
  //     return data[date];
  //   });
   
  // this.setState({
  //   chartData: chartData      
  // })

  // }


  render() {
    return (
      <div>
        <h1>
         Spontanepooo let's gooooo!
        </h1>
      </div>

    )
  }

}

export default App;

