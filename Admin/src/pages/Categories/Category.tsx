import { useEffect, useState } from 'react'
import CheckBox from '../../components/UI/CheckBox'
import { ICategory } from '../../store/Global.Store'
import { twMerge } from 'tailwind-merge'

type categoryProps = {
  category: ICategory
  handleRowSelection: (id: string) => void
  rowSelection: string[]
}

const Category = ({ category, handleRowSelection, rowSelection }: categoryProps) => {
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    setIsSelected(rowSelection.includes(category._id))
  }, [rowSelection])

  const handleSelect = () => {
    handleRowSelection(category._id)
    setIsSelected(!isSelected)
  }

  return (
    <div
      onClick={handleSelect}
      key={category._id}
      className={twMerge(
        'transition-all duration-300 ease-in-out bg-white',
        'p-2 cursor-pointer text-primary shadow-inner border rounded-lg w-full',
        'flex items-center justify-between gap-2',
        (category.isArchived || isSelected) && 'border-b-4 border-r-4',
        category.isArchived && 'bg-sky-50 border-sky-200',
        isSelected && 'border-primary',
      )}
    >
      <p>{category.name}</p>
      <div className="flex items-center gap-1">
        {category.isArchived && <span className="text-xs text-sky-500">დაარქივებულია</span>}
        <CheckBox clickable={false} checked={isSelected} id={category._id} />
      </div>
    </div>
  )
}

export default Category
