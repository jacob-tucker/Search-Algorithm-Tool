import React, {useState} from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer'
import Navbar from './Navbar/Navbar'

const App = () => {
  const [uniqueKey, setUniqueKey] = useState(1)

  const restart = () => {
    setUniqueKey(uniqueKey + 1)
    console.log(uniqueKey)
  }

  return (
    <div className="App">
      <Navbar></Navbar>
      <button className="restart" onClick={restart}>Restart</button>
      <PathfindingVisualizer key={uniqueKey}></PathfindingVisualizer>
    </div>
  );
}

export default App;
