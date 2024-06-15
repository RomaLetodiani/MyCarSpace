import { toast } from 'react-toastify'
import Button from '../../components/UI/Button'
import GlobalStore from '../../store/Global.Store'
import { useState } from 'react'
import { useInput } from '../../hooks/useInput'
import productService from '../../services/Product.Service'
import HandlerHeader from '../../components/HandlerHeader'
import CheckBox from '../../components/UI/CheckBox'
import Input from '../../components/UI/Input'

const Products = () => {
  const { products, setProducts } = GlobalStore()
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [addMode, setAddMode] = useState(false)
  const [onSale, setOnSale] = useState(true)
  const titleInput = useInput((value) => !!value)
  const descriptionInput = useInput((value) => !!value)
  const priceInput = useInput((value) => +value > 0, 1)
  const salePriceInput = useInput((value) => +value > 0, 1)
  const countInStockInput = useInput((value) => +value > 0, 1)
  // const [selectedCategory, setSelectedCategory] = useState('')

  const handleArchive = async (ids: string[]) => {
    await productService.archiveProducts(ids).then(() => {
      ids.forEach((id) => {
        const updatedProducts = products.map((product) => {
          if (product._id === id) {
            return { ...product, archived: true }
          }
          return product
        })
        setProducts(updatedProducts)
      })
      toast.success('კატეგორია წარმატებით დაარქივდა')
    })
  }
  const handleRestore = async (ids: string[]) => {
    await productService.restoreProducts(ids).then(() => {
      ids.forEach((id) => {
        const updatedProducts = products.map((product) => {
          if (product._id === id) {
            return { ...product, archived: false }
          }
          return product
        })
        setProducts(updatedProducts)
      })
      toast.success('კატეგორია წარმატებით აღდგა')
    })
  }
  const handleDelete = async (ids: string[]) => {
    await productService.deleteProducts(ids).then(() => {
      const updatedProducts = products.filter((product) => !ids.includes(product._id))
      setProducts(updatedProducts)
    })
    toast.success('კატეგორია წარმატებით წაიშალა')
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
      toast.error('გთხოვთ მონიშნოთ მინიმუმ ერთი კატეგორია')
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
  ]
  const handleAdd = (e: any) => {
    e.preventDefault()
    if (errors.some((error) => error)) {
      toast.error('გთხოვთ შეიყვანოთ სწორი ინფორმაცია პროდუქტის შესახებ')
      return
    }

    productService
      .createProduct({
        title: titleInput.value as string,
        description: descriptionInput.value as string,
        price: priceInput.value as number,
        salePrice: salePriceInput.value as number,
        countInStock: countInStockInput.value as number,
        category: '60d7d3d3d1f6f20015b2f2a0',
      })
      .then(({ data }) => {
        setProducts([...products, data])
        setAddMode(false)
        titleInput.clear()
        toast.success('პროდუქტი შექმნილია')
      })
      .catch(() => {
        toast.error('შეცდომა პროდუქტის შექმნისას')
      })
  }
  const handleCancel = () => {
    setAddMode(false)
    titleInput.clear()
    descriptionInput.clear()
    priceInput.clear()
    salePriceInput.clear()
    countInStockInput.clear()
  }
  return (
    <div>
      <HandlerHeader handleRows={handleRows} turnAddMode={() => setAddMode(true)} />
      <div>
        {!products.length && !addMode && (
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

        {products.length > 0 && (
          <div className="flex flex-col gap-2">
            {products.map((product) => (
              <div
                key={product._id}
                className="p-1 shadow-sm w-full flex items-center justify-between"
                onClick={() => handleRowSelection(product._id)}
              >
                <p>{product.title}</p>
                <CheckBox checked={selectedRowKeys.includes(product._id)} id={product._id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
