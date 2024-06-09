import { Link, useLocation } from 'react-router-dom'
import { NavBarTexts } from '../utils/NavBarTexts'
import { twMerge } from 'tailwind-merge'

const NavBar = () => {
  const { pathname } = useLocation()
  return (
    <nav>
      <ul className="flex gap-5">
        {NavBarTexts.map((text, index) => (
          <Link key={index} to={text.url}>
            <li
              className={twMerge(
                ' transition-transform duration-300 cursor-pointer text-lg ',
                pathname === text.url ? 'text-primary font-semibold' : 'text-secondary',
              )}
            >
              {text.title}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
