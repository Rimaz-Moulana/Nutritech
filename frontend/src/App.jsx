// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import Dropdown from './components/dropdown/Dropdown'

function App(){
// const App =()=> (

//   <AuthProvider>
//     <Router>
//       <Routes>
//       <Route path="/" element={<Navbar />} />
//       {/* <Route path="/drop" element={<Dropdown/>} /> */}
//       </Routes>
//     </Router>
//   </AuthProvider>
  
  const Nav = () => {
    return (
      <div>
        <Navbar />
      </div>
    )
  }

  const Drop = () => {
    return (
      <div>
        <Dropdown />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Nav />,
    },
    {
      path: '/drop',
      element: <Drop />,
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )

}

export default App


