import { Outlet } from 'react-router-dom'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import fetchProducts from '../pages/Home/Views/Hooks/FetchProducts'
const Root = () => {
  fetchProducts()
  console.log('🚀 ~ useEffect ~ loading:')

  return (
    <div className="min-w-[375px] w-full min-h-screen flex flex-col text-primary">
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
