import { toast } from 'react-toastify'
import AuthStore from '../../store/Auth.Store'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useEffect, useState } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'
import RightSightBar from './RightSightBar'
import productService from '../../services/Product.Service'
import categoryService from '../../services/Category.Service'
import GlobalStore from '../../store/Global.Store'
// import authService from '../../services/Auth.Service'

const Admin = () => {
  const { clearTokens } = AuthStore()
  const { setCategories, setProducts } = GlobalStore()
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const isNotMobile = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    productService.allProducts({}).then(({ data }) => {
      setProducts(data)
    })
    categoryService.allCategories({}).then(({ data }) => {
      setCategories(data)
    })
  }, [])

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
      <div className="h-screen overflow-auto md:flex-1 pt-[150px] md:pt-5 p-5 bg-slate-100">
        <Outlet />
      </div>
      {isNotMobile && <RightSightBar handleLogout={handleLogout} />}
    </div>
  )
}

export default Admin
