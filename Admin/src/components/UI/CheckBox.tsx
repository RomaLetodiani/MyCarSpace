import { InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface CheckBoxI extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  checked: boolean
  checkedText?: string
  uncheckedText?: string
  withText?: boolean
  clickable?: boolean
}

const CheckBox = ({
  id,
  checked,
  withText = false,
  checkedText,
  uncheckedText,
  clickable = true,
  ...rest
}: CheckBoxI) => {
  return (
    <div className="flex items-center gap-2">
      <label
        className={twMerge(
          'flex justify-center pointer-events-none items-center w-5 h-5 border rounded-full cursor-pointer transition-colors duration-300 ease-in-out',
          checked ? 'bg-primary' : 'bg-gray-200',
          clickable && 'pointer-events-auto',
        )}
        htmlFor={id}
      >
        <div
          className={twMerge(
            'w-2 h-2 rounded-full bg-white transform transition-transform duration-300 ease-in-out',
          )}
        ></div>
      </label>
      {withText && (checked ? checkedText : uncheckedText)}
      <input {...rest} type="checkbox" className="hidden" id={id} />
    </div>
  )
}

export default CheckBox
