import { SelectHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type SelectorProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: option[]
  label?: string
  selected: string
  setSelected: (selected: string) => void
  labelClassName?: string
  defaultText: string
}

type option = {
  value: string
  title: string
  disabled?: boolean
}

const Selector = ({
  options,
  label,
  selected,
  setSelected,
  labelClassName,
  defaultText,
  ...rest
}: SelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value)
  }
  return (
    <div className="w-full relative">
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
        className={twMerge('w-full border outline-none px-3 py-2 rounded-xl', label && 'pt-6')}
        onChange={handleChange}
        defaultValue={selected}
      >
        <option value="" disabled>
          {defaultText}
        </option>
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
