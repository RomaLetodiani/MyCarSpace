import { useEffect, useState } from 'react'
import CheckBox from '../../components/UI/CheckBox'
import { ICategory } from '../../store/Global.Store'

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
      className="p-2 cursor-pointer shadow-inner border-b-2 rounded-lg w-full flex items-center justify-between"
    >
      <p>{category.name}</p>
      <CheckBox clickable={false} checked={isSelected} id={category._id} />
    </div>
  )
}

export default Category
