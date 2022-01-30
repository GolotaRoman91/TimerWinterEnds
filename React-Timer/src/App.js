import React from 'react';
import './App.css';
import { now, finalDate, refreshTime } from './Constants/time';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: finalDate - now };
}

transformData = (data) => {
  const days = Math.floor(data / (24 * 60 * 60 * 1000));
  const hours = Math.floor((data % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)) + 1;
  const minutes = Math.floor((data % (60 * 60 * 1000)) / (1000 * 60));
  const seconds = Math.floor((data % (60 * 1000)) / 1000);

  if (data < 0) {
      clearInterval();
  } else {
      return {
          day: days,
          hour: hours,
          minute: minutes,
          second: seconds,
      };
  }
}

componentDidMount() {
    this.timerWinterEnds = setInterval(() => this.tick(), refreshTime);
}

componentWillUnmount() {
    clearInterval(this.timerWinterEnds);
}

tick() {
    let amountTime = finalDate - new Date().getTime();
    this.setState({ data: amountTime });
}
  render() {
    return (
      <div className="App">
        <strong>
          Winter ends after...
          <div>{this.transformData(this.state.data).day} days</div>
          <div>{this.transformData(this.state.data).hour} hours</div>
          <div>{this.transformData(this.state.data).minute} minutes</div>
          <div>{this.transformData(this.state.data).second} seconds</div>
          Or
          <div>{this.state.data} ms</div>
        </strong>
      </div>
    );
  }
}

export default App;
