import SideBar from './components/sidebar/AnnotatorSideBar';
import TimeStampdropdown from './components/dropdown/TimeStampdropdown'
import Allvideos from './pages/Annotator/Allvideos';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllVideos from './pages/Annotator/Allvideos';
import AnnotatedVideos from './pages/Annotator/AnnotatedVideos';
import UnannotatedVideos from './pages/Annotator/UnannotatedVideos';
// import './App.css'
import Log from './pages/Log'
import Login from './pages/login'

function App(){
// const App =()=> (
  return (
    <BrowserRouter>
        <Routes>
            {/* <Route path='/'  > */}
              {/* <Route path='/' element={<Nabra/>} /> */}
              <Route path='/login' element={<Login />} />
              <Route path='/log' element={<Log />} />
              <Route path="/all" element={<Allvideos/>} />
              <Route path="/time" element={<TimeStampdropdown/>} />
              <Route path="/annotated-videos" element={<AnnotatedVideos/>} />
              <Route path="/unannotated-videos" element={<UnannotatedVideos/>} />

            {/* </Route> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App;


