import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
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
import ProtectedRoute from './context/ProtectedRoute.jsx';
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
import SensorManagerProducts from './pages/SensorManager/Products';
import ReviewProduct from './pages/SensorManager/ReviewProduct';
import ReviewVideos from './pages/SensorManager/ReviewVideos';
import Rules from './pages/SensorManager/Rules';
import Login from './pages/test/Login.jsx';
import LoginPage from './pages/test/LoginForm.jsx';
import RegisterPage from './pages/test/RegisterForm.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <ProtectedRoute path='/' component={Login} />
          <ProtectedRoute path='/log' component={Log} />
          <ProtectedRoute path='/blankPages' component={BlankPage} />
          <ProtectedRoute path='annotator/product' component={ProductDetails} />
          <ProtectedRoute path='/test' component={Test} />
          <ProtectedRoute path='annotator/addedproduct' component={AddedProduct} />
          <ProtectedRoute exact path="/register/Login" component={LoginPage} />
          <ProtectedRoute exact path="/register" component={RegisterPage} />
          <ProtectedRoute path="annotator/all" component={Allvideos} />
          <ProtectedRoute path="annotator/annotation/:videoId" component={AnnotationTable} />
          <ProtectedRoute path="annotator/annotated-videos" component={AnnotatedVideos} />
          <ProtectedRoute path="/unannotated-videos" component={UnannotatedVideos} />
          <ProtectedRoute path="annotator/text" component={Videowithtext} />
          <ProtectedRoute path="annotator/test" component={Product} />
          <ProtectedRoute path="annotator/history" component={History} />
          <ProtectedRoute path="/uploadvideo" component={UploadVideo} />
          <ProtectedRoute path="/row" component={Row} />
          <ProtectedRoute path="/annotator/home" component={AnnotatorHome} />
          <ProtectedRoute path="/sensormanagerhome" component={SensorManagerHome} />
          <ProtectedRoute path="sensor manager/sensormanagernewvideo" component={NewVideos} />
          <ProtectedRoute path="/uploadvideo2" component={UploadVideo2} />
          <ProtectedRoute path="/reviewvideo/:videoId" component={ReviewVideos} />
          <ProtectedRoute path="/rules" component={Rules} />
          <ProtectedRoute path="/editrules" component={EditRule} />
          <ProtectedRoute path="/annotationhistory/:videoId" component={AnnotationHistory} />
          <ProtectedRoute path='/addnewproduct' component={AddNewProduct} />
          <ProtectedRoute path='/addnewproduct2' component={AddNewProduct2} />
          <ProtectedRoute path='/sensormanagerproducts' component={SensorManagerProducts} />
          <ProtectedRoute path='/reviewproduct/:productId' component={ReviewProduct} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
