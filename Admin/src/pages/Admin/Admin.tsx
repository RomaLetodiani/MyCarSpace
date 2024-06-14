import { toast } from 'react-toastify'
import Logo from '../../components/Logo'
import Button from '../../components/UI/Button'
import AuthStore from '../../store/Auth.Store'
// import authService from '../../services/Auth.Service'

const Admin = () => {
  const { clearTokens } = AuthStore()

  const handleLogout = () => {
    //! FIXME: Add This when backend service will be ready
    // authService.logout()

    clearTokens()
    toast.success('წარმატებით გახვედით სისტემიდან')
  }
  return (
    <div className="flex">
      <div className="p-5 flex flex-col gap-5 items-center justify-between h-screen shadow-xl ">
        <div className="flex flex-col gap-10">
          <Logo maxWidth="w-[100px]" />
          <ul>
            <li>პროდუქტები</li>
            <li>კატეგორიები</li>
          </ul>
        </div>
        <div>
          <Button onClick={handleLogout} className="bg-sky-300">
            გასვლა
          </Button>
        </div>
      </div>
      <div className="flex-1 bg-slate-100"></div>
      <div className="p-5 h-screen shadow-xl"></div>
    </div>
  )
}

export default Admin
