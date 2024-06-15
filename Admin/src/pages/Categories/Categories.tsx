import { useState } from 'react'
import Button from '../../components/UI/Button'
import GlobalStore from '../../store/Global.Store'
import categoryService from '../../services/Category.Service'
import { toast } from 'react-toastify'
import Input from '../../components/UI/Input'
import { useInput } from '../../hooks/useInput'
import HandlerHeader from '../../components/HandlerHeader'
import Category from './Category'

const Categories = () => {
  const { categories, setCategories } = GlobalStore()
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [addMode, setAddMode] = useState(false)
  const addInput = useInput((value) => !!value)

  const handleArchive = async (ids: string[]) => {
    await categoryService
      .archiveCategories(ids)
      .then(() => {
        ids.forEach((id) => {
          const updatedCategories = categories.map((category) => {
            if (category._id === id) {
              return { ...category, isArchived: true }
            }
            return category
          })
          setCategories(updatedCategories)
        })
        toast.success('კატეგორია წარმატებით დაარქივდა')
      })
      .catch((error) => {
        toast.error('შეცდომა კატეგორიის დაარქივებისას')
        throw error
      })
  }
  const handleRestore = async (ids: string[]) => {
    await categoryService
      .restoreCategories(ids)
      .then(() => {
        ids.forEach((id) => {
          const updatedCategories = categories.map((category) => {
            if (category._id === id) {
              return { ...category, isArchived: false }
            }
            return category
          })
          setCategories(updatedCategories)
        })
        toast.success('კატეგორია წარმატებით აღდგა')
      })
      .catch((error) => {
        toast.error('შეცდომა კატეგორიის აღდგენისას')
        throw error
      })
  }
  const handleDelete = async (ids: string[]) => {
    await categoryService
      .deleteCategories(ids)
      .then(() => {
        const updatedCategories = categories.filter((category) => !ids.includes(category._id))
        setCategories(updatedCategories)
        toast.success('კატეგორია წარმატებით წაიშალა')
      })
      .catch((error) => {
        toast.error('შეცდომა კატეგორიის წაშლისას')
        throw error
      })
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

    new Promise(async (resolve) => {
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
      resolve(null)
    })
  }
  const handleAdd = (e: any) => {
    e.preventDefault()
    if (!addInput.value || addInput.hasError) {
      toast.error('გთხოვთ შეიყვანოთ კატეგორიის სახელი')
      return
    }

    categoryService
      .createCategory({ name: addInput.value as string })
      .then(({ data }) => {
        setCategories([...categories, data])
        setAddMode(false)
        addInput.clear()
        toast.success('კატეგორია შექმნილია')
      })
      .catch(() => {
        toast.error('შეცდომა კატეგორიის შექმნისას')
      })
  }
  const handleCancel = () => {
    setAddMode(false)
    addInput.clear()
  }

  return (
    <div>
      <HandlerHeader handleRows={handleRows} turnAddMode={() => setAddMode(true)} />
      <div className="flex flex-col gap-2">
        {!categories.length && !addMode && (
          <div className="p-5 mt-5 text-center rounded-lg bg-secondary/20 text-primary shadow-2xl">
            <p>გთხოვთ დაამატოთ კატეგორია</p>
          </div>
        )}

        {addMode && (
          <form
            onSubmit={handleAdd}
            className="p-5 mt-5 flex flex-col gap-3 justify-end items-end rounded-lg bg-purple/20 text-primary shadow-2xl"
          >
            <Input {...addInput} label="კატეგორიის სახელი" />
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

        {categories.length > 0 && (
          <div className="flex flex-col gap-2 mt-5">
            {categories.map((category) => (
              <Category
                key={category._id}
                handleRowSelection={handleRowSelection}
                category={category}
                rowSelection={selectedRowKeys}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories
