import { useRef, useState } from 'react'
import Logo from '../components/Logo'
import Aside from './Aside'
import useMediaQuery from '../hooks/useMediaQuery'
import Burger from '../components/Burger'
import useClickOutside from '../hooks/useClickOutside'
import { twMerge } from 'tailwind-merge'
import SearchBar from '../components/SearchBar/SearchBar'
import NavBar from './NavBar'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isSmallScreen = useMediaQuery('(max-width: 666px)')
  const headerRef = useRef<HTMLDivElement>(null)
  const handleOutsideClick = () => {
    if (!isDesktop) {
      setIsMenuOpen(false)
    }
  }

  useClickOutside(headerRef, handleOutsideClick)

  return (
    <>
      <div
        ref={headerRef}
        className="w-full h-[100px] bg-purple/10 bg-center p-5 flex justify-between items-center gap-10 shadow-sky-100 shadow-lg"
      >
        <Logo maxWidth="w-[100px]" />
        {!isSmallScreen && <SearchBar />}
        {isDesktop && <NavBar />}
        {!isDesktop && <Burger open={isMenuOpen} setOpen={setIsMenuOpen} />}
      </div>
      {!isDesktop && (
        <>
          <Aside isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isDesktop={isDesktop} />
          <div
            className={twMerge(
              'absolute h-full transition-all duration-500 right-0 top-0 bg-black/20 backdrop-blur-[1px]',
              isMenuOpen ? 'w-full' : 'w-0',
            )}
          ></div>
        </>
      )}
    </>
  )
}

export default Header
