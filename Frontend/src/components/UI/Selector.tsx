import { SelectHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type SelectorProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: option[]
  label?: string
  selected: string | number
  setSelected: (selected: string | number) => void
  labelClassName?: string
  wrapperClassName?: string
  selectorClassName?: string
  defaultText: string
}

type option = {
  value: string | number
  title: string
  disabled?: boolean
}

const Selector = ({
  options,
  label,
  selected,
  setSelected,
  labelClassName,
  wrapperClassName,
  selectorClassName,
  defaultText,
  ...rest
}: SelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    // Determine whether the value should be a number or string
    const parsedValue = isNaN(Number(value)) ? value : Number(value)
    setSelected(parsedValue)
  }
  return (
    <div className={twMerge('w-full relative', wrapperClassName)}>
      <label
        htmlFor={rest.id}
        className={twMerge(
          'absolute top-1 text-sm left-4 pointer-events-none transition-all',
          labelClassName,
        )}
      >
        {label}
      </label>
      <select
        className={twMerge(
          'w-full border outline-none px-3 py-2 rounded-xl',
          label && 'pt-6',
          selectorClassName,
        )}
        onChange={handleChange}
        value={selected as string}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Selector
