import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [currentValue, setCount] = useState(10);

  // let currentValue = 15;

  let addValue = () => {
    if(currentValue < 20) {
      currentValue++;
      setCount(currentValue);
    }
  }

  let removeValue = () => {
    if(currentValue > 0) {
      currentValue--;
      setCount(currentValue);
    }
  }

  let getDisplayText = () => {
    if(currentValue === 20) {
      return "Maximum count reached (20)";
    }
    else if(currentValue === 0) {
      return "Minimum Count reached (0)";
    }
    else {
      return `current value -> ${currentValue}`;
    }
  }

  return (
    <>
      <h1>Simple Counter App</h1>
      <h2>{getDisplayText()}</h2>
      <button onClick={addValue}>Add Value</button>
      <button onClick={removeValue}>Remove Value</button>
    </>
  )
}

export default App
