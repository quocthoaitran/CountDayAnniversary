import React from 'react';
import './App.css';
import Countdown from './Countdown';

function App() {
  return (
    <div className="App">
      <Countdown
        timeTillDate="06 10 2019, 00:00 am"
        timeFormat="MM DD YYYY, h:mm a"
      />
    </div>
  );
}

export default App;
