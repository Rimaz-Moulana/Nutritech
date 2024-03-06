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

// import AnnotationHistory from '../src/pages/Annotator/History';
// import AnnotatorHome from '../src/pages/Annotator/Home';
import AddNewProduct from '../src/pages/Industry/AddNewProduct';
import AddNewProduct2 from '../src/pages/Industry/AddNewProduct2.jsx';

// import AnnotationHistory from '../src/pages/Annotator/History';
// import AnnotatorHome from '../src/pages/Annotator/Home';
import AnnotationHistory from '../src/pages/Annotator/History'
import AnnotatorHome from '../src/pages/Annotator/Home'
import SensorManagerHome from '../src/pages/SensorManager/Home'

// import AddedProductt from './pages/Annotator/AddedProductt';
import SensorManagerProducts from './pages/SensorManager/Products';
import ReviewProduct from './pages/SensorManager/ReviewProduct';
import IndustryHistory from './pages/Industry/History'
import ExpertPanelHome from './pages/ExpertPanel/Home'
import ExpertPanelNewVideos from './pages/ExpertPanel/NewVideos'
import ApproveVideos from './pages/ExpertPanel/ReviewVideos';
import RedFlag from './pages/ExpertPanel/RedFlag';
import GreenFlag from './pages/ExpertPanel/GreenFlag';
import ExpertRules from './pages/ExpertPanel/Rules'
import ReviewHistory from './pages/ExpertPanel/ReviewHistory';

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
              <Route path="/sensormanagerhome" element={<SensorManagerHome/>} />
              {/* <Route path="/homeswiper" element={<HomeSwiper/>} /> */}

              <Route path="/sensormanagernewvideo" element={<NewVideos/>} />
              {/* <Route path="/sensormanagernewvideo" element={<NewVideos/>} /> */}
              <Route path="/uploadvideo2" element={<UploadVideo2 />} />
              {/* <Route path="/reviewvideo" element={<ReviewVideos />} /> */}
              

              <Route path="/reviewvideo/:videoId" element={<ReviewVideos/>} />
              <Route path="/rules" element={<Rules/>} />
              <Route path="/editrules" element={<EditRule/>} />
              <Route path="/annotationhistory/:videoId" element={<AnnotationHistory/>} />


              <Route path='/addnewproduct' element={<AddNewProduct />} />
              <Route path='/addnewproduct2' element={<AddNewProduct2 />} />

              <Route path='/sensormanagerproducts' element ={<SensorManagerProducts/>} />
              <Route path='/reviewproduct/:productId' element ={<ReviewProduct/>} />


              <Route path='/industryhistory' element ={<IndustryHistory/>} />


              <Route path='/expertpanelhome' element ={<ExpertPanelHome/>} />
              <Route path='/expertpanelnew' element ={<ExpertPanelNewVideos/>} />
              <Route path='/approvevideo/:videoId' element ={<ApproveVideos/>} />
              <Route path='/red' element ={<RedFlag/>} />
              <Route path='/green' element ={<GreenFlag/>} />
              <Route path='/expertrules' element ={<ExpertRules/>} />
              <Route path='/expertreviewhistory/:videoId' element ={<ReviewHistory/>} />
            {/* </Route> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App;


