import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Log from './pages/Log'
import Login from './pages/login'

function App() {
  

  return (
    <BrowserRouter>
        <Routes>
            {/* <Route path='/'  > */}
              {/* <Route path='/' element={<Nabra/>} /> */}
              <Route path='/login' element={<Login />} />
              <Route path='/log' element={<Log />} />
            {/* </Route> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App
