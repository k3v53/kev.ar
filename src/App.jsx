import { useState } from 'react'
import Window from './components/Window.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Hello World</h1>
      <Window />
    </div>
  )
}

export default App
