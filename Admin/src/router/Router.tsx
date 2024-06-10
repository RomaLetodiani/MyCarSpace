import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import AdminRoute from './AdminRoute'
import Login from '../pages/Auth/Login'
import Admin from '../pages/Admin/Admin'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        element: <AdminRoute />,
        children: [
          {
            path: '/',
            element: <Admin />,
          },
        ],
      },
      { path: 'login', element: <Login /> },
    ],
  },
])

export default Router
