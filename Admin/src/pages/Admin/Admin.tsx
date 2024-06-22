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
  const { setLoadingCategories, setLoadingProducts } = GlobalStore()
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const isNotMobile = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (!isNotMobile) {
      if (isSideBarOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }, [isSideBarOpen, isNotMobile])

  useEffect(() => {
    setLoadingCategories(true)
    setLoadingProducts(true)
    productService
      .allProducts({
        pageSize: 500,
      })
      .then(({ data }) => {
        setProducts(data.products)
      })
      .finally(() => {
        setLoadingProducts(false)
      })
    categoryService
      .allCategories({
        isArchived: undefined,
      })
      .then(({ data }) => {
        setCategories(data)
      })
      .finally(() => {
        setLoadingCategories(false)
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
      <div className="h-screen overflow-auto md:flex-1 pt-5 p-5 bg-slate-100">
        <Outlet />
      </div>
      {isNotMobile && <RightSightBar handleLogout={handleLogout} />}
    </div>
  )
}

export default Admin
