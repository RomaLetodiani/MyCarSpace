import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const Root = () => {
  return (
    <div className="flex relative flex-col w-full h-full min-w-[375px] min-h-screen">
      <ToastContainer />
      <Outlet />
    </div>
  )
}

export default Root
