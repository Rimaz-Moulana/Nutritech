// import './App.css'
import Navbar from './components/navbar/Navbar'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

function App() {
  
  const Nav = () => {
    return (
      <div>
        <Navbar />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Nav />,
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
