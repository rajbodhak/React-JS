import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  const myOBJ = {
    age: 45,
    isAdult: true
  }

  return (
    <>
    <Card  greeting = "Hello" details = {myOBJ} btnText = "Click To Join"/>
    <Card greeting = "Great" btnText = "Click here To Join"/>    
    </>
  )
}

export default App
