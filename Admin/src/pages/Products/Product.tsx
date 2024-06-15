import { useEffect, useState } from 'react'
import CheckBox from '../../components/UI/CheckBox'
import { IProduct } from '../../store/Global.Store'
import Button from '../../components/UI/Button'
import { twMerge } from 'tailwind-merge'
import { toast } from 'react-toastify'
import { sliceText } from '../../utils/sliceText'

type ProductProps = {
  product: IProduct
  handleRowSelection: (id: string) => void
  rowSelection: string[]
}

const Product = ({ product, handleRowSelection, rowSelection }: ProductProps) => {
  const [isSelected, setIsSelected] = useState(false)
  const [editMode, setEditMode] = useState(false)
  useEffect(() => {
    setIsSelected(rowSelection.includes(product._id))
  }, [rowSelection])

  const handleSelect = () => {
    handleRowSelection(product._id)
    setIsSelected(!isSelected)
  }

  const enableEditMode = (e: any) => {
    e.stopPropagation()
    setEditMode(true)
  }
  const cancelEditMode = () => {
    setEditMode(false)
  }
  const saveChanges = () => {
    toast.warn('აგიწყობ განახლებებსაც მეორე პროექტს მოვრჩე')
    cancelEditMode()
  }
  return editMode ? (
    // TODO: Implement Edit Mode
    <div>
      editia shechema gasaketebeli
      <p></p> <Button onClick={cancelEditMode}>გაუქმება</Button>
      <Button onClick={saveChanges}>განახლება</Button>
    </div>
  ) : (
    <div
      onClick={handleSelect}
      key={product._id}
      className={twMerge(
        'transition-all duration-300 ease-in-out bg-white',
        'p-2 cursor-pointer text-primary shadow-inner border rounded-lg w-full',
        'flex flex-row justify-between items-center max-[500px]:flex-col-reverse max-[500px]:items-end gap-5',
        (product.isArchived || isSelected) && 'border-b-4 border-r-4',
        product.isArchived && 'bg-sky-50 border-sky-200',
        isSelected && 'border-primary',
      )}
    >
      <div className="flex w-full flex-col gap-2 break-words break-all hyphens-auto">
        <p>სათაური: {sliceText(product.title, 50)}</p>
        <p className="">აღწერა: {sliceText(product.description, 100)}</p>
        <p>ფასი: {product.price}</p>
        <p>მარაგი: {product.countInStock}</p>
        {product.salePrice && <p>ფასდაკლების ფასი: {product.salePrice}</p>}
        <p>კატეგორია: {product.category.name}</p>
        {product.imageUrls && (
          <div>
            <p>სურათები:</p>
            <div className="flex flex-wrap gap-1">
              {product.imageUrls.map((url) => (
                <img key={url} src={url} alt={product.title} className="w-10 h-10 rounded-lg" />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={enableEditMode}>რედაქტირება</Button>
        <CheckBox clickable={false} checked={isSelected} id={product._id} />
      </div>
    </div>
  )
}

export default Product
