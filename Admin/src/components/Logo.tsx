import { Link } from 'react-router-dom'
import { logo } from '../assets'

type LogoProps = {
  maxWidth?: string
}

const Logo = ({ maxWidth = 'w-full' }: LogoProps) => {
  return (
    <Link to="/">
      <div className={maxWidth}>
        <img className="w-full h-full" src={logo} alt="My Car Space Logo" />
      </div>
    </Link>
  )
}

export default Logo
