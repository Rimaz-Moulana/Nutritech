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
import UnannotatedVideos from './pages/Annotator/UnannotatedVideos.jsx';

import { default as Login } from './pages/test/Login.jsx';
import Register from './pages/test/RegisterForm.jsx';
// import Row from './components/AnnotationTable/Row';
// import Buttons from './components/AnnotationTable/Buttons';
import Product from './pages/Annotator/Product';
import History from './pages/Researcher/History';
import UploadVideo from './pages/Researcher/UploadVideo';
import UploadVideo2 from './pages/Researcher/UploadVideo2';
import NewVideos from './pages/SensorManager/NewVideos';

import Row from './components/AnnotationTable/Row';
import EditRule from './components/Popup/EditRule';
import Rules from './pages/Rules';
import ReviewVideos from './pages/SensorManager/ReviewVideos';

// import AnnotationHistory from '../src/pages/Annotator/History';
// import AnnotatorHome from '../src/pages/Annotator/Home';
import AddNewProduct from '../src/pages/Industry/AddNewProduct';
import AddNewProduct2 from '../src/pages/Industry/AddNewProduct2.jsx';

// import AnnotationHistory from '../src/pages/Annotator/History';
// import AnnotatorHome from '../src/pages/Annotator/Home';
import AnnotationHistory from '../src/pages/Annotator/History';
import AnnotatorHome from '../src/pages/Annotator/Home';
import SensorManagerHome from '../src/pages/SensorManager/Home';

// import AddedProductt from './pages/Annotator/AddedProductt';
import GreenFlag from './pages/ExpertPanel/GreenFlag';
import ExpertPanelHome from './pages/ExpertPanel/Home';
import ExpertPanelNewVideos from './pages/ExpertPanel/NewVideos';
import RedFlag from './pages/ExpertPanel/RedFlag';
import ReviewHistory from './pages/ExpertPanel/ReviewHistory';
import ApproveVideos from './pages/ExpertPanel/ReviewVideos';
// import ExpertRules from './pages/ExpertPanel/Rules';
import IndustryHistory from './pages/Industry/History';
import SensorManagerProducts from './pages/SensorManager/Products';
import ReviewProduct from './pages/SensorManager/ReviewProduct';

import IndustryHome from './pages/Industry/Home';
import ResearcherHome from './pages/Researcher/Home';


import AddUser from './pages/Admin/AddUser.jsx';
import AllUsers from './pages/Admin/AdminDashboard.jsx';
import VideoHistory from './pages/Industry/VideoHistory.jsx';

import VideoHistory from './pages/Industry/VideoHistory.jsx';
import ReviewedVideos from './pages/ExpertPanel/ReviewedVideos.jsx';




import './App.css';


function App(){

  return (
    <BrowserRouter>
        <Routes>
              {/* <Route path='/text' element={<VideoToText />} /> */}
            {/* <Route path='/'  > */}
              <Route path='/' element={<Login />} />
              {/* <Route path='/login' element={<Login />} />
              <Route path='/log' element={<Log />} /> */}
              <Route path='/register' element={<Register />} />
              <Route path='/blankPages' element={<BlankPage />} />
              <Route path='/product/:productId' element={<ProductDetails />} />
              <Route path='/test' element={<Test />} />
              <Route path='/addedproduct/:type' element={<AddedProduct />} />

              

              <Route path="/all" element={<Allvideos/>} />
              <Route path="/annotation/:videoId" element={<AnnotationTable />} />
              <Route path="/annotated-videos" element={<AnnotatedVideos/>} />
              <Route path="/unannotated-videos" element={<UnannotatedVideos/>} />
              <Route path="/text" element={<Videowithtext/>} />
              <Route path="/test" element={<Product/>} />
              <Route path="/history" element={<History/>} />
              <Route path="/uploadvideo" element={<UploadVideo/>} />
              <Route path="/row" element={<Row/>} />
              <Route path="/home" element={<AnnotatorHome/>} /> {/*annotatorhomepage*/}
              <Route path="/sensormanagerhome" element={<SensorManagerHome/>} /> {/*sensormanager home page*/}
              {/* <Route path="/homeswiper" element={<HomeSwiper/>} /> */}

              <Route path="/sensormanagernewvideo" element={<NewVideos/>} />
              {/* <Route path="/sensormanagernewvideo" element={<NewVideos/>} /> */}
              <Route path="/uploadvideo2" element={<UploadVideo2 />} />
              {/* <Route path="/reviewvideo" element={<ReviewVideos />} /> */}
              

              <Route path="/reviewvideo/:videoId" element={<ReviewVideos/>} />
              <Route path="/rules/:type" element={<Rules/>} />
              <Route path="/editrules" element={<EditRule/>} />
              <Route path="/annotationhistory/:videoId" element={<AnnotationHistory/>} />


              <Route path='/addnewproduct' element={<AddNewProduct />} />
              <Route path='/addnewproduct2' element={<AddNewProduct2 />} />

              <Route path='/sensormanagerproducts' element ={<SensorManagerProducts/>} />
              <Route path='/reviewproduct/:productId' element ={<ReviewProduct/>} />


              <Route path='/industryhistory' element ={<IndustryHistory/>} />
              <Route path='/videohistory/:videoId' element ={<VideoHistory/>} />


              <Route path='/expertpanelhome' element ={<ExpertPanelHome/>} /> {/*expert panel home page */}
              <Route path='/expertpanelnew' element ={<ExpertPanelNewVideos/>} />
              <Route path='/approvevideo/:videoId' element ={<ApproveVideos/>} />
              <Route path='/red' element ={<RedFlag/>} />
              <Route path='/green' element ={<GreenFlag/>} />
              {/* <Route path='/expertrules' element ={<ExpertRules/>} /> */}
              <Route path='/expertreviewhistory/:videoId' element ={<ReviewHistory/>} />
              <Route path='/productDetails' element={<ViewProductDetails />} />

              <Route path='/researcherhome' element ={<ResearcherHome/>} /> {/*reseracherhome*/}
              <Route path='/industryhome' element ={<IndustryHome/>} /> {/*industryhome*/}

              <Route path='/addUser' element={<AddUser />} />
              <Route path='/users' element={<AllUsers />} />
              <Route path='/reviewedvideos' element={<ReviewedVideos />} />
            {/* </Route> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App;