import { Outlet } from 'react-router-dom'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import HandleProducts from '../pages/Shop/HandleProducts'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
const Root = () => {
  HandleProducts()
  return (
    <div className="min-w-[375px] w-full min-h-screen flex flex-col">
      <ToastContainer />
      <Header />
      <div className="w-full flex flex-col flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Root
