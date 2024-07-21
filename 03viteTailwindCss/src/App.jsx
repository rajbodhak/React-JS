import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-yellow-400 text-red-600 p-4 rounded-xl border-4 border-red-800'>TailWind CSS</h1>
    </>
  )
}

export default App
