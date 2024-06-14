import { twMerge } from 'tailwind-merge'
import Logo from '../../components/Logo'
import { Link } from 'react-router-dom'
import Burger from '../../components/Burger'
import AdminAvatar from './AdminAvatar'

const Sidebar = ({
  isOpen,
  toggle,
  isMobile,
}: {
  isOpen: boolean
  toggle: () => void
  isMobile: boolean
}) => {
  return (
    <>
      {isMobile && (
        <div className="absolute w-full flex justify-between items-center p-5 shadow-xl">
          <AdminAvatar size="w-12 h-12" />
          <Burger open={isOpen} toggle={toggle} />
        </div>
      )}
      <div
        className={twMerge(
          'p-5 flex flex-col gap-5 items-center z-40 bg-white justify-between h-screen shadow-xl transition-all duration-500 ease-in-out',
          isMobile && 'fixed w-full',
          isMobile && (isOpen ? 'translate-y-0' : '-translate-y-full'),
        )}
      >
        <div className="flex flex-col gap-10">
          <Logo maxWidth="w-[100px]" />
          <ul>
            <Link to="products">
              <li>პროდუქტები</li>
            </Link>
            <Link to="categories">
              <li>კატეგორიები</li>
            </Link>
          </ul>
        </div>
        {isMobile}
      </div>
    </>
  )
}

export default Sidebar
