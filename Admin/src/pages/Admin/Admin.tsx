import { toast } from 'react-toastify'
import AuthStore from '../../store/Auth.Store'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useState } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'
import RightSightBar from './RightSightBar'
// import authService from '../../services/Auth.Service'

const Admin = () => {
  const { clearTokens } = AuthStore()
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const isNotMobile = useMediaQuery('(min-width: 768px)')

  const handleToggle = () => {
    setIsSideBarOpen((prev) => !prev)
  }

  const handleLogout = () => {
    //! FIXME: Add This when backend service will be ready
    // authService.logout()

    clearTokens()
    toast.success('წარმატებით გახვედით სისტემიდან')
  }
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar toggle={handleToggle} isOpen={isSideBarOpen} isMobile={!isNotMobile} />
      <div className="h-screen overflow-auto md:flex-1 pt-[132px] md:pt-0 bg-slate-100">
        <Outlet />
      </div>
      {isNotMobile && <RightSightBar handleLogout={handleLogout} />}
    </div>
  )
}

export default Admin
