import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';



import Videowithtext from './components/AnnotationTable/Videowithtext';
import BlankPage from './components/theme/BlankPage';
import Test from './components/theme/test';
import AddedProduct from './pages/Annotator/AddedProduct';
import Allvideos from './pages/Annotator/Allvideos';
import AnnotatedVideos from './pages/Annotator/AnnotatedVideos';
import AnnotationTable from './pages/Annotator/AnnotationTable';
import ProductDetails from './pages/Annotator/ProductDetails';
import UnannotatedVideos from './pages/Annotator/UnannotatedVideos';
import Log from './pages/Log';
import Login from './pages/Login';
// import Row from './components/AnnotationTable/Row';
// import Buttons from './components/AnnotationTable/Buttons';
import Product from './pages/Annotator/Product';
import History from './pages/MediaStation/History';
import UploadVideo from './pages/MediaStation/UploadVideo';
import UploadVideo2 from './pages/MediaStation/UploadVideo2';
import NewVideos from './pages/SensorManager/NewVideos';

import Row from './components/AnnotationTable/Row';
import EditRule from './components/Popup/EditRule';
import ReviewVideos from './pages/SensorManager/ReviewVideos';
import Rules from './pages/SensorManager/Rules';

import AnnotationHistory from '../src/pages/Annotator/History';
import AnnotatorHome from '../src/pages/Annotator/Home';

import AddedProductt from './pages/Annotator/AddedProductt';
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
              <Route path='/addedproduct' element={<AddedProduct />} />

              <Route path='/addedproduct2' element={<AddedProductt />} />

              <Route path="/all" element={<Allvideos/>} />
              <Route path="/annotation/:videoId" element={<AnnotationTable />} />
              <Route path="/annotated-videos" element={<AnnotatedVideos/>} />
              <Route path="/unannotated-videos" element={<UnannotatedVideos/>} />
              <Route path="/text" element={<Videowithtext/>} />
              <Route path="/test" element={<Product/>} />
              <Route path="/history" element={<History/>} />
              <Route path="/uploadvideo" element={<UploadVideo/>} />
              <Route path="/row" element={<Row/>} />
              <Route path="/home" element={<AnnotatorHome/>} />
              {/* <Route path="/homeswiper" element={<HomeSwiper/>} /> */}

              <Route path="/sensormanagernewvideo" element={<NewVideos/>} />
              {/* <Route path="/sensormanagernewvideo" element={<NewVideos/>} /> */}
              <Route path="/uploadvideo2" element={<UploadVideo2 />} />
              

              <Route path="/reviewvideos" element={<ReviewVideos/>} />
              <Route path="/rules" element={<Rules/>} />
              <Route path="/editrules" element={<EditRule/>} />
              <Route path="/annotationhistory/:videoId" element={<AnnotationHistory/>} />
            {/* </Route> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App;


