import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import AnnotationHistory from '../src/pages/Annotator/History';
import AnnotatorHome from '../src/pages/Annotator/Home';
import SensorManagerHome from '../src/pages/SensorManager/Home';
import Row from './components/AnnotationTable/Row';
import Videowithtext from './components/AnnotationTable/Videowithtext';
import EditRule from './components/Popup/EditRule';
import BlankPage from './components/theme/BlankPage';
import Test from './components/theme/test';
import { AuthProvider } from './context/AuthProvider.jsx';
import AddedProduct from './pages/Annotator/AddedProduct';
import Allvideos from './pages/Annotator/Allvideos';
import AnnotatedVideos from './pages/Annotator/AnnotatedVideos';
import AnnotationTable from './pages/Annotator/AnnotationTable';
import Product from './pages/Annotator/Product';
import ProductDetails from './pages/Annotator/ProductDetails';
import UnannotatedVideos from './pages/Annotator/UnannotatedVideos';
import Log from './pages/Log';
import History from './pages/MediaStation/History';
import UploadVideo from './pages/MediaStation/UploadVideo';
import UploadVideo2 from './pages/MediaStation/UploadVideo2';
import NewVideos from './pages/SensorManager/NewVideos';

import ReviewVideos from './pages/SensorManager/ReviewVideos';
import Rules from './pages/SensorManager/Rules';

import AddNewProduct from '../src/pages/Industry/AddNewProduct';
import AddNewProduct2 from '../src/pages/Industry/AddNewProduct2.jsx';

// import AnnotationHistory from '../src/pages/Annotator/History';
// import AnnotatorHome from '../src/pages/Annotator/Home';
// import AnnotationHistory from '../src/pages/Annotator/History'

import SensorManagerProducts from './pages/SensorManager/Products';
import ReviewProduct from './pages/SensorManager/ReviewProduct';
import Login from './pages/test/Login.jsx';
import LoginPage from './pages/test/LoginForm.jsx';
import RegisterPage from './pages/test/RegisterForm.jsx';

  // import './App.css'
  function App() {

    return (
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/'  > */}
          {/* <Route path='/' element={<Nabra/>} /> */}
          <Route path='/' element={<Login />} />
          {/* <Route path='/login' element={<Login />} /> */}
          <Route path='/log' element={<Log />} />
          <Route path='/blankPages' element={<BlankPage />} />


          <Route path='annotator/product' element={<ProductDetails />} />
          <Route path='/test' element={<Test />} />
          <Route path='annotator/addedproduct' element={<AddedProduct />} />

          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />


          <Route path="annotator/all" element={<Allvideos />} />
          <Route path="annotator/annotation/:videoId" element={<AnnotationTable />} />
          <Route path="annotator/annotated-videos" element={<AnnotatedVideos />} />
          <Route path="/unannotated-videos" element={<UnannotatedVideos />} />
          <Route path="annotator/text" element={<Videowithtext />} />
          <Route path="annotator/test" element={<Product />} />
          <Route path="annotator/history" element={<History />} />

          <Route path="/uploadvideo" element={<UploadVideo />} />
          <Route path="/row" element={<Row />} />
          <Route path="annotator/home" element={<AnnotatorHome />} />

          <Route path="/sensormanagerhome" element={<SensorManagerHome />} />
          {/* <Route path="/homeswiper" element={<HomeSwiper/>} /> */}

          <Route path="sensor manager/sensormanagernewvideo" element={<NewVideos />} />
          {/* <Route path="/sensormanagernewvideo" element={<NewVideos/>} /> */}
          <Route path="/uploadvideo2" element={<UploadVideo2 />} />
          {/* <Route path="/reviewvideo" element={<ReviewVideos />} /> */}


          <Route path="/reviewvideo/:videoId" element={<ReviewVideos />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/editrules" element={<EditRule />} />
          <Route path="/annotationhistory/:videoId" element={<AnnotationHistory />} />


          <Route path='/addnewproduct' element={<AddNewProduct />} />
          <Route path='/addnewproduct2' element={<AddNewProduct2 />} />

          <Route path='/sensormanagerproducts' element={<SensorManagerProducts />} />
          <Route path='/reviewproduct/:productId' element={<ReviewProduct />} />

          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
