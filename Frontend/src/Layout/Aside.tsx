import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { NavBarTexts } from '../utils/NavBarTexts'
import { Link, useLocation } from 'react-router-dom'

const Aside = ({
  isMenuOpen,
  setIsMenuOpen,
  isDesktop,
}: {
  isMenuOpen: boolean
  setIsMenuOpen: (value: boolean) => void
  isDesktop: boolean
}) => {
  const { pathname } = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    !isDesktop && (
      <div
        className={twMerge(
          'fixed pt-[100px] transform top-0 right-0 w-64 h-full bg-gray-800 text-white transition-transform duration-700 ease-in-out z-50',
          isMenuOpen ? '-translate-x-0' : 'translate-x-full',
        )}
      >
        <ul className="text-right">
          {NavBarTexts.map((text, index) => (
            <Link key={index} to={text.url}>
              <li className="p-4 hover:bg-gray-700 cursor-pointer">{text.title}</li>
            </Link>
          ))}
        </ul>
      </div>
    )
  )
}

export default Aside
