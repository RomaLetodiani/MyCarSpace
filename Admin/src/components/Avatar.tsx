import { Role } from '../store/Auth.Store'
import { twMerge } from 'tailwind-merge'

export type Size =
  | 'w-8 h-8'
  | 'w-10 h-10'
  | 'w-12 h-12'
  | 'w-14 h-14'
  | 'w-16 h-16'
  | 'w-20 h-20'
  | 'w-24 h-24'
  | 'w-28 h-28'
  | 'w-32 h-32'
  | 'w-36 h-36'
  | 'w-40 h-40'
  | 'w-44 h-44'
  | 'w-48 h-48'
  | 'w-52 h-52'
  | 'w-56 h-56'

type AvatarProps = {
  alt: string
  src: string
  size: Size

  username: string
  role: Role
}

const Avatar = ({ alt, src, size, username, role }: AvatarProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className={twMerge('shadow-xl bg-secondary/50 rounded-full p-3', size)}>
        <img src={src} alt={alt} width={size} height={size} />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-primary">{username}</p>
        <p className="text-xs font-normal text-secondary">{role}</p>
      </div>
    </div>
  )
}

export default Avatar
