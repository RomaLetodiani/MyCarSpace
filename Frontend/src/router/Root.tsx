import { Outlet } from 'react-router-dom'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import GlobalStore from '../Stores/Global.Store'
import categoryService from '../services/Category.Service'
import { useEffect } from 'react'

const Root = () => {
  const { setCategories } = GlobalStore()
  useEffect(() => {
    categoryService.allCategories().then((res: any) => {
      setCategories(res)
    })
  }, [])
  return (
    <div className="min-w-[375px] w-full min-h-screen flex flex-col">
      <Header />
      <div className="w-full flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Root
