import { toast } from 'react-toastify'
import Button from '../../components/UI/Button'
import GlobalStore from '../../store/Global.Store'
import { FormEvent, useState } from 'react'
import { useInput } from '../../hooks/useInput'
import productService from '../../services/Product.Service'
import HandlerHeader from '../../components/HandlerHeader'
import CheckBox from '../../components/UI/CheckBox'
import Input from '../../components/UI/Input'
import Selector from '../../components/UI/Selector'
import ImageToBase64Converter from '../../components/ImagesToBase64Converter'
import Product from './Product'

const Products = () => {
  const { products, categories, setProducts, loadingProducts } = GlobalStore()
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [addMode, setAddMode] = useState(false)
  const [onSale, setOnSale] = useState(true)
  const titleInput = useInput(() => true)
  const descriptionInput = useInput(() => true)
  const priceInput = useInput((value) => +value > 0, 1)
  const salePriceInput = useInput((value) => +value > 0, 1)
  const countInStockInput = useInput((value) => +value > 0, 1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [images, setImages] = useState<string[]>([])

  const handleArchive = async (ids: string[]) => {
    await productService.archiveProducts(ids).then(() => {
      ids.forEach((id) => {
        const updatedProducts = products.map((product) => {
          if (product._id === id) {
            return { ...product, isArchived: true }
          }
          return product
        })
        setProducts(updatedProducts)
      })
      toast.success('პროდუქტი წარმატებით დაარქივდა')
    })
  }
  const handleRestore = async (ids: string[]) => {
    await productService.restoreProducts(ids).then(() => {
      ids.forEach((id) => {
        const updatedProducts = products.map((product) => {
          if (product._id === id) {
            return { ...product, isArchived: false }
          }
          return product
        })
        setProducts(updatedProducts)
      })
      toast.success('პროდუქტი წარმატებით აღდგა')
    })
  }
  const handleDelete = async (ids: string[]) => {
    await productService.deleteProducts(ids).then(() => {
      const updatedProducts = products.filter((product) => !ids.includes(product._id))
      setProducts(updatedProducts)
    })
    toast.success('პროდუქტი წარმატებით წაიშალა')
  }
  const handleRowSelection = (id: string) => {
    if (selectedRowKeys.includes(id)) {
      setSelectedRowKeys(selectedRowKeys.filter((key) => key !== id))
    } else {
      setSelectedRowKeys([...selectedRowKeys, id])
    }
  }
  const handleRows = async (action: 'delete' | 'archive' | 'restore') => {
    if (!selectedRowKeys.length) {
      toast.error('გთხოვთ მონიშნოთ მინიმუმ ერთი პროდუქტი')
      return
    }

    if (action === 'delete') {
      await handleDelete(selectedRowKeys)
    }
    if (action === 'archive') {
      await handleArchive(selectedRowKeys)
    }

    if (action === 'restore') {
      await handleRestore(selectedRowKeys)
    }

    setSelectedRowKeys([])
  }

  const errors = [
    !titleInput.value,
    titleInput.hasError,
    !descriptionInput.value,
    descriptionInput.hasError,
    !priceInput.value,
    priceInput.hasError,
    !salePriceInput.value,
    salePriceInput.hasError,
    !countInStockInput.value,
    countInStockInput.hasError,
    !selectedCategory,
  ]
  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    if (errors.some((error) => error)) {
      toast.error('გთხოვთ შეიყვანოთ სწორი ინფორმაცია პროდუქტის შესახებ')
      return
    }
    const id = toast.loading('პროდუქტი ემატება')

    productService
      .createProduct({
        title: titleInput.value as string,
        description: descriptionInput.value as string,
        price: priceInput.value as number,
        salePrice: onSale ? (salePriceInput.value as number) : null,
        countInStock: countInStockInput.value as number,
        category: selectedCategory,
        imageUrls: images,
      })
      .then(({ data }) => {
        setProducts([...products, data])
        handleCancel()
        toast.update(id, {
          render: 'პროდუქტი შექმნილია',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        })
      })
      .catch(() => {
        toast.update(id, {
          render: 'შეცდომა პროდუქტის დამატებისას',
          type: 'error',
          isLoading: false,
          autoClose: 2000,
        })
      })
  }
  const handleCancel = () => {
    setAddMode(false)
    titleInput.clear()
    descriptionInput.clear()
    priceInput.clear()
    salePriceInput.clear()
    countInStockInput.clear()
    setSelectedCategory('')
    setImages([])
  }
  return (
    <div>
      <HandlerHeader handleRows={handleRows} turnAddMode={() => setAddMode(true)} />
      <div>
        {!products.length && !addMode && !loadingProducts && (
          <div className="p-5 mt-5 text-center rounded-lg bg-secondary/20 text-primary shadow-2xl">
            გთხოვთ დაამატოთ პროდუქტი
          </div>
        )}
        {addMode && (
          <form
            onSubmit={handleAdd}
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
                initialImages={images}
                handleChange={(images) => setImages(images)}
              />
            </div>
            <div className="flex gap-3">
              <Button type="button" onClick={handleCancel} btnType="secondary" className="px-5">
                გაუქმება
              </Button>
              <Button type="submit" className="px-5">
                შექმნა
              </Button>
            </div>
          </form>
        )}
        {loadingProducts && (
          <div className="p-5 mt-5 text-center rounded-lg bg-secondary/20 text-primary shadow-2xl">
            პროდუქტები იტვირთება
          </div>
        )}
        {products.length > 0 && !loadingProducts && (
          <div className="flex flex-col gap-2 mt-5">
            {products.map((product) => (
              <Product
                key={product._id}
                categories={categories}
                products={products}
                setProducts={setProducts}
                handleRowSelection={handleRowSelection}
                product={product}
                rowSelection={selectedRowKeys}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
