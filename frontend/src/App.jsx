import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'

// import Navbar from './components/navbar/Navbar'
// import Dropdown from './components/dropdown/Dropdown'
// import VideoContainer from './components/videoContainer/VideoContainer'
import TimeStampdropdown from './components/dropdown/TimeStampdropdown'
import Allvideos from './pages/Allvideos';

// function App(){
const App =()=> (
  <AuthProvider>
    <Router>
      <Routes>
      <Route path="/all" element={<Allvideos/>} />
      {/* <Route path="/drop" element={<Dropdown/>} /> */}
      {/* <Route path="/grid" element={<VideoContainer/>} /> */}
      <Route path="/time" element={<TimeStampdropdown/>} />
      </Routes>
    </Router>
  </AuthProvider>
  
);

export default App;


