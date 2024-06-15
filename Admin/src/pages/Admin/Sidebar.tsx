import { twMerge } from 'tailwind-merge'
import Logo from '../../components/Logo'
import { Link, useLocation } from 'react-router-dom'
import Burger from '../../components/Burger'
import AdminAvatar from './AdminAvatar'
import { navbarTexts } from '../../utils/const'

const Sidebar = ({
  isOpen,
  toggle,
  isMobile,
}: {
  isOpen: boolean
  toggle: () => void
  isMobile: boolean
}) => {
  const { pathname } = useLocation()
  return (
    <>
      {isMobile && (
        <div className="absolute w-full flex justify-between bg-slate-100 items-center p-5 shadow-lg">
          <AdminAvatar size="w-12 h-12" />
          <Burger open={isOpen} toggle={toggle} />
        </div>
      )}
      <div
        className={twMerge(
          'p-5 flex flex-col gap-5 items-center z-40 bg-white justify-between w-[170px] h-screen shadow-xl transition-transform duration-500 ease-in-out',
          isMobile && 'fixed w-full',
          isMobile && (isOpen ? 'translate-y-0' : '-translate-y-full'),
        )}
      >
        <div className="flex flex-col items-center gap-10">
          <Logo maxWidth="w-[100px]" />
          <ul className="flex flex-col gap-5 text-center text-lg">
            {navbarTexts.map((item) => (
              <Link onClick={() => isMobile && toggle()} key={item.path} to={item.path}>
                <li
                  className={twMerge(
                    'text-secondary border-secondary transition-colors duration-300 ease-in-out py-2 px-3 w-full text-sm rounded-md',
                    item.path === pathname.slice(1) &&
                      'text-bold text-xl border-b-2 shadow-lg text-primary',
                  )}
                >
                  {item.text}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
