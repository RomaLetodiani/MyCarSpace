import { Navigate, createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import AdminRoute from './AdminRoute'
import Login from '../pages/Auth/Login'
import Admin from '../pages/Admin/Admin'
import Products from '../pages/Products/Products'
import Categories from '../pages/Categories/Categories'

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
            children: [
              {
                path: '/',
                element: <Navigate to="products" />,
              },
              {
                path: 'products',
                element: <Products />,
              },
              {
                path: 'categories',
                element: <Categories />,
              },
            ],
          },
        ],
      },
      { path: 'login', element: <Login /> },
    ],
  },
])

export default Router
