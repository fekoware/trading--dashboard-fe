import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Header } from './components/Header'
import Accounts from './components/Accounts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <h1>My Trading Dashboard</h1>
    <Accounts />
      
    </>
  )
}

export default App
