import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';



import BlankPage from './components/theme/BlankPage';
import AddedProduct from './pages/Annotator/AddedProduct';
import Allvideos from './pages/Annotator/Allvideos';
import AnnotatedVideos from './pages/Annotator/AnnotatedVideos';
import ProductDetails from './pages/Annotator/ProductDetails';
import UnannotatedVideos from './pages/Annotator/UnannotatedVideos';
import Log from './pages/Log';
import Login from './pages/Login';
// import ProductDetails from './pages/Annotator/ProductDetails';
import AnnotationTable from './pages/Annotator/AnnotationTable';
import Row from './components/AnnotationTable/Row';
import Buttons from './components/AnnotationTable/Buttons';
import Videowithtext from './components/AnnotationTable/Videowithtext';
import Annotation from './pages/Annotator/AnnotationTable';

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
              {/* <Route path='/test' element={<Test />} /> */}
              <Route path='/addedproduct' element={<AddedProduct />} />
              <Route path="/all" element={<Allvideos/>} />
              <Route path="/annotation" element={<AnnotationTable />} />
              <Route path="/annotated-videos" element={<AnnotatedVideos/>} />
              <Route path="/unannotated-videos" element={<UnannotatedVideos/>} />
              <Route path="/text" element={<Videowithtext/>} />

            {/* </Route> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App;


