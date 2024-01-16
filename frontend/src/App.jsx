import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TimeStampdropdown from './components/dropdown/TimeStampdropdown';
import SideBar from './components/sidebar/AnnotatorSideBar';
import BlankPage from './components/theme/BlankPage';
import Allvideos from './pages/Allvideos';
import Log from './pages/Log';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';

function App(){

  return (
    <BrowserRouter>
        <Routes>
            {/* <Route path='/'  > */}
              {/* <Route path='/' element={<Nabra/>} /> */}
              <Route path='/login' element={<Login />} />
              <Route path='/log' element={<Log />} />
              <Route path='/blankPages' element={<BlankPage />} />
              <Route path='/product' element={<ProductDetails />} />
              

              <Route path="/all" element={<Allvideos/>} />
              <Route path="/time" element={<TimeStampdropdown/>} />
              <Route path="/side" element={<SideBar />} />
            {/* </Route> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App;


