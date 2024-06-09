import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import ErrorPage from '../pages/Error/ErrorPage'
import Home from '../pages/Home/Home'
import Contact from '../pages/Contact/Contact'
import Shop from '../pages/Shop/Shop'
import Product from '../pages/Product/Product'
import About from '../pages/About/About'
import FAQ from '../pages/FAQ/FAQ'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'faq',
        element: <FAQ />,
      },
      {
        path: 'shop',
        element: <Shop />,
        children: [
          {
            path: ':id',
            element: <Product />,
          },
        ],
      },
    ],
  },
])

export default Router
