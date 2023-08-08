import './App.css'

import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import ChartStation from './components/ChartStation'
import { useEffect, useState } from 'react'
import ConfigsPage from './pages/ConfigsPage'
import { useOrientation } from 'react-use';


function App() {


  const [user, setUser] = useState(null)

  return (

    <div className='App'>

      <Routes>
        <Route path='/' element={<ChartStation />} />
        <Route path='/:station' element={<ChartStation />} />
        {/* <Route path='/config' element={<ConfigsPage />} /> */}
      </Routes>

    </div>
  )
}

export default App
