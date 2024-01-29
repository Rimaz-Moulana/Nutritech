import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import BlankPage from './components/theme/BlankPage';
import AddedProduct from './pages/Annotator/AddedProduct';
import Allvideos from './pages/Annotator/Allvideos';
import AnnotatedVideos from './pages/Annotator/AnnotatedVideos';
import AnnotationTable from './pages/Annotator/AnnotationTable';
import ProductDetails from './pages/Annotator/ProductDetails';
import UnannotatedVideos from './pages/Annotator/UnannotatedVideos';
import Log from './pages/Log';
import Login from './pages/Login';
import Videowithtext from './components/AnnotationTable/Videowithtext';
import Annotation from './pages/Annotator/AnnotationTable';
import Product from './pages/Annotator/Product'
import Home from './pages/Annotator/Home';
import History from './pages/MediaStation/History'
import UploadVideo from './pages/MediaStation/UploadVideo';
import NewVideos from './pages/SensorManager/NewVideos';
import ReviewVideos from './pages/SensorManager/ReviewVideos';
import Rules from './pages/SensorManager/Rules'
import EditRule from './components/Popup/EditRule'

import Test from './components/theme/test';

// import './App.css'


function App(){

  return (
    <BrowserRouter>
        <Routes>
            {/* <Route path='/'  > */}
              {/* <Route path='/' element={<Nabra/>} /> */}
              <Route path='/' element={<Login />} />
              <Route path='/home' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/log' element={<Log />} />
              <Route path='/blankPages' element={<BlankPage />} />
              <Route path='/product' element={<ProductDetails />} />
              {/* <Route path='/test' element={<Test />} /> */}
               {/* <Route path='/addedproduct' element={<AddedProduct />} />    */}

               {/* <Route path='/test' element={<Test />} /> */}
              <Route path='/addedproduct' element={<AddedProduct />} />
              <Route path="/all" element={<Allvideos/>} />
              <Route path="/annotation" element={<AnnotationTable />} />
              <Route path="/annotated-videos" element={<AnnotatedVideos/>} />
              <Route path="/unannotated-videos" element={<UnannotatedVideos/>} />
              <Route path="/text" element={<Videowithtext/>} />
              <Route path="/test" element={<Product/>} />
              <Route path="/history" element={<History/>} />
              <Route path="/uploadvideo" element={<UploadVideo/>} />

              <Route path="/sensormanagernewvideo" element={<NewVideos/>} />
              <Route path="/reviewvideos" element={<ReviewVideos/>} />
              <Route path="/rules" element={<Rules/>} />
              <Route path="/editrules" element={<EditRule/>} />
            {/* </Route> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App;


