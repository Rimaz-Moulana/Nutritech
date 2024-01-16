import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import SideBar from './components/sidebar/AnnotatorSideBar';
import TimeStampdropdown from './components/dropdown/TimeStampdropdown'
import Allvideos from './pages/Allvideos';

// function App(){
const App =()=> (
  <AuthProvider>
    <Router>
      <Routes>
      <Route path="/all" element={<Allvideos/>} />
      <Route path="/time" element={<TimeStampdropdown/>} />
      <Route path="/side" element={<SideBar />} />
      </Routes>
    </Router>
  </AuthProvider>
  
);

export default App;


