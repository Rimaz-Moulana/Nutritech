import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';


import TimeStamp from './components/AnnotationTable/TimeStamp';
import TextField from './components/fields/textfield';

import BlankPage from './components/theme/BlankPage';
import Allvideos from './pages/Annotator/Allvideos';
import AnnotatedVideos from './pages/Annotator/AnnotatedVideos';
import UnannotatedVideos from './pages/Annotator/UnannotatedVideos';
import Log from './pages/Log';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Test from './pages/test/test';
// import './App.css'


function App(){

  return (
    <BrowserRouter>
        <Routes>
            {/* <Route path='/'  > */}
              {/* <Route path='/' element={<Nabra/>} /> */}
              <Route path='/' element={<Login />} />
              <Route path='/login' element={<Login />} />
              <Route path='/log' element={<Log />} />
              <Route path='/blankPages' element={<BlankPage />} />
              <Route path='/product' element={<ProductDetails />} />
              <Route path='/test' element={<Test />} />
              <Route path='/input' element={<TextField />} />
              

              <Route path="/all" element={<Allvideos/>} />
              <Route path="/time" element={<TimeStamp/>} />
              <Route path="/annotated-videos" element={<AnnotatedVideos/>} />
              <Route path="/unannotated-videos" element={<UnannotatedVideos/>} />

            {/* </Route> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App;


