import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import TimeStamp from './components/AnnotationTable/TimeStamp';
import BlankPage from './components/theme/BlankPage';
import Allvideos from './pages/Allvideos';
import AnnotatedVideos from './pages/Annotator/AnnotatedVideos';
import UnannotatedVideos from './pages/Annotator/UnannotatedVideos';
import Log from './pages/Log';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
// import './App.css'


function App(){

  return (
    <BrowserRouter>
        <Routes>
            {/* <Route path='/'  > */}
              {/* <Route path='/' element={<Nabra/>} /> */}
              <Route path='/' element={<Login />} />
              <Route path='/log' element={<Log />} />
              <Route path='/blankPages' element={<BlankPage />} />
              <Route path='/product' element={<ProductDetails />} />
              

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


