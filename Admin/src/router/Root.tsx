import { Outlet } from 'react-router-dom'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const Root = () => {
  return (
    <div>
      <ToastContainer />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Root
