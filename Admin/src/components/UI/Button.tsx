import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonI extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  btnType?: 'primary' | 'secondary' | 'danger'
}

const Button = ({ children, className, btnType = 'primary', ...rest }: ButtonI) => {
  return (
    <button
      {...rest}
      className={twMerge(
        'rounded-lg cursor-pointer p-2 shadow-lg hover:opacity-70',
        btnType === 'primary' ? 'bg-primary text-white' : 'bg-secondary/10 text-primary',
        btnType === 'danger' && 'bg-danger text-white',
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
