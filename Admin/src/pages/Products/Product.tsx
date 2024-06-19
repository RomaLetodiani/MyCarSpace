import { FormEvent, useEffect, useState } from 'react'
import CheckBox from '../../components/UI/CheckBox'
import { ICategory, IProduct } from '../../store/Global.Store'
import Button from '../../components/UI/Button'
import { twMerge } from 'tailwind-merge'
import { toast } from 'react-toastify'
import { sliceText } from '../../utils/sliceText'
import ImageToBase64Converter from '../../components/ImagesToBase64Converter'
import Selector from '../../components/UI/Selector'
import Input from '../../components/UI/Input'
import { useInput } from '../../hooks/useInput'
import productService from '../../services/Product.Service'

type ProductProps = {
  product: IProduct
  products: IProduct[]
  setProducts: (products: IProduct[]) => void
  categories: ICategory[]
  handleRowSelection: (id: string) => void
  rowSelection: string[]
}

const Product = ({
  product,
  products,
  setProducts,
  categories,
  handleRowSelection,
  rowSelection,
}: ProductProps) => {
  const [onSale, setOnSale] = useState(!!product.salePrice)
  const titleInput = useInput(() => true, product.title)
  const descriptionInput = useInput(() => true, product.description)
  const priceInput = useInput((value) => +value > 0, product.price)
  const salePriceInput = useInput((value) => +value > 0, !product.salePrice ? 1 : product.salePrice)
  const countInStockInput = useInput((value) => +value > 0, product.countInStock)
  const [selectedCategory, setSelectedCategory] = useState(product.category._id)
  const [images, setImages] = useState<string[]>([])
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
  const handleUpdateProduct = (e: FormEvent) => {
    e.preventDefault()
    const updatedProduct = {
      title: titleInput.value,
      description: descriptionInput.value,
      price: +priceInput.value,
      salePrice: onSale ? +salePriceInput.value : undefined,
      countInStock: +countInStockInput.value,
      category: selectedCategory,
      imageUrls: images,
    }
    const id = toast.loading('პროდუქტი ახლდება')
    productService
      .updateProduct(product._id, updatedProduct)
      .then(({ data }) => {
        const updatedProducts = products.map((product) => {
          if (product._id === data._id) {
            return data
          }
          return product
        })
        setProducts(updatedProducts as IProduct[])
        toast.update(id, {
          render: 'პროდუქტი განახლებულია',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        })
        handleCancel()
      })
      .catch(() => {
        toast.update(id, {
          render: 'შეცდომა პროდუქტის განახლებისას',
          type: 'error',
          isLoading: false,
          autoClose: 2000,
        })
      })

    handleCancel()
  }
  const handleCancel = () => {
    setEditMode(false)
    titleInput.clear()
    descriptionInput.clear()
    priceInput.clear()
    salePriceInput.clear()
    countInStockInput.clear()
    setSelectedCategory(product.category._id)
    setImages([])
  }
  return editMode ? (
    // TODO: Refactor this to a separate component
    <form
      onSubmit={handleUpdateProduct}
      className="p-5 mt-5 flex flex-col gap-3 justify-end items-end rounded-lg bg-purple/20 text-primary shadow-2xl"
    >
      <div className="p-5 bg-sky-50 w-full flex flex-col gap-2 rounded-lg">
        <Input {...titleInput} label="პროდუქტის სახელი" />
        <Input {...descriptionInput} label="პროდუქტის დახასიათება" />
        <div className="flex gap-5 justify-between">
          <Input type="number" {...priceInput} label="ფასი" />
          <Input type="number" {...countInStockInput} label="რაოდენობა" />
        </div>
        <div className="flex gap-5 items-center">
          <CheckBox id="onSale" checked={onSale} onChange={() => setOnSale(!onSale)} />
          <Input
            type="number"
            disabled={!onSale}
            {...salePriceInput}
            label={onSale ? 'ფასი ფასდაკლებით' : 'ჩართეთ ფასდაკლება'}
          />
        </div>
        <Selector
          options={categories?.map((category) => ({
            value: category._id,
            title: category.name,
            disabled: category.isArchived,
          }))}
          disabled={!categories.length}
          name="category"
          label="კატეგორია"
          selected={selectedCategory}
          setSelected={(selected) => setSelectedCategory(selected)}
          defaultText={categories.length ? 'აირჩიეთ კატეგორია' : 'შეამოწმეთ კატეგორიების სია'}
        />
        <ImageToBase64Converter
          id="addProductImages"
          initialImages={product.imageUrls || []}
          handleChange={(images) => setImages(images)}
        />
      </div>
      <div className="flex gap-3">
        <Button type="button" onClick={handleCancel} btnType="secondary" className="px-5">
          გაუქმება
        </Button>
        <Button type="submit" className="px-5">
          განახლება
        </Button>
      </div>
    </form>
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
