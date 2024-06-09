import { Socials } from '../utils/Socials'

const SocialsDiv = () => {
  return (
    <div className="flex gap-5">
      {Socials.map((social, index) => (
        <a
          className="text-primary hover:scale-110 transform transition-transform duration-300"
          key={index}
          href={social.url}
          target="_blank"
          rel="noreferrer"
        >
          {social.icon}
        </a>
      ))}
    </div>
  )
}

export default SocialsDiv
