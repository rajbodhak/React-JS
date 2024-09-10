import React, { Suspense } from 'react'
// import DashBoard from './components/DashBoard'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
const Landing = React.lazy(() => import('./components/Landing'))
const DashBoard = React.lazy(() => import('./components/DashBoard'))

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/dashboard' element= { <Suspense fallback = {"Loading..."}> <DashBoard/> </Suspense> }/>
          <Route path='/' element = { <Suspense fallback = {"Loading..."}> <Landing/> </Suspense>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

function NavBar() {

  const navigate = useNavigate()
  return (
    <div>
      <button onClick={() => navigate('/')}>Landing</button>
      <button onClick={() => navigate('/dashboard')}>DashBoard</button>
    </div>
  )
}

export default App
