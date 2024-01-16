import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import SideBar from './components/sidebar/AnnotatorSideBar';
import TimeStampdropdown from './components/dropdown/TimeStampdropdown'
import Allvideos from './pages/Allvideos';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Log from './pages/Log'
import Login from './pages/login'

function App(){
// const App =()=> (
  return (
    <BrowserRouter>
        <Routes>
            {/* <Route path='/'  > */}
              {/* <Route path='/' element={<Nabra/>} /> */}
              <Route path='/login' element={<Login />} />
              <Route path='/log' element={<Log />} />
              <Route path="/all" element={<Allvideos/>} />
              <Route path="/time" element={<TimeStampdropdown/>} />
              <Route path="/side" element={<SideBar />} />
            {/* </Route> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App;


