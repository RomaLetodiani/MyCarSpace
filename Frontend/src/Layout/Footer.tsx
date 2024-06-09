import Logo from '../components/Logo'
import SocialsDiv from '../components/Socials'
import useMediaQuery from '../hooks/useMediaQuery'
import NavBar from './NavBar'

const Footer = () => {
  const isMobile = useMediaQuery('(max-width: 767px)')
  return (
    <footer className="bg-purple/20 text-secondary">
      <div className="flex items-center justify-between gap-5 w-full p-5">
        <Logo maxWidth="w-[50px] md:w-[80px]" />
        {!isMobile && <NavBar />}
        <SocialsDiv />
      </div>
      <div className="border-t border-primary/10 text-center text-xs md:text-base p-2">
        Copyright © 2024. All Rights Reserved
      </div>
    </footer>
  )
}

export default Footer
