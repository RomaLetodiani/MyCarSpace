import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import Home from '../pages/Home/Home'
import Profile from '../pages/Profile/Profile'
import AdminRoute from './AdminRoute'
import Login from '../pages/Auth/Login'

const Router = createBrowserRouter([
  {
    element: <AdminRoute />,
    children: [
      { path: '/', element: <Root /> },
      { path: 'home', element: <Home /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  { path: 'login', element: <Login /> },
])

export default Router
