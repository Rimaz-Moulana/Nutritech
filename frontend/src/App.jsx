import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'

import Navbar from './components/navbar/Navbar'
import Dropdown from './components/dropdown/Dropdown'
import VideoContainer from './components/videoContainer/VideoContainer'

// function App(){
const App =()=> (
  <AuthProvider>
    <Router>
      <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/drop" element={<Dropdown/>} />
      <Route path="/grid" element={<VideoContainer/>} />
      </Routes>
    </Router>
  </AuthProvider>
  
);

export default App;


