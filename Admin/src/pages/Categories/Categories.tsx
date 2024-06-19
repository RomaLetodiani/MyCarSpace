import { FormEvent, useState } from 'react'
import GlobalStore from '../../store/Global.Store'
import categoryService from '../../services/Category.Service'
import { toast } from 'react-toastify'
import { useInput } from '../../hooks/useInput'
import HandlerHeader from '../../components/HandlerHeader'
import handleCategories from './handleCategories'
import RenderCategories from './RenderCategories'

const Categories = () => {
  const { handleArchive, handleDelete, handleRestore } = handleCategories()
  const { categories, setCategories, loadingCategories } = GlobalStore()
  const [addMode, setAddMode] = useState(false)
  const addInput = useInput((value) => !!value)

  // Row Selection
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const handleRowSelection = (id: string) => {
    if (selectedRowKeys.includes(id)) {
      setSelectedRowKeys(selectedRowKeys.filter((key) => key !== id))
    } else {
      setSelectedRowKeys([...selectedRowKeys, id])
    }
  }

  // Handle Rows Actions (Delete, Archive, Restore)
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

  // Handle Add Category
  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!addInput.value || addInput.hasError) {
      toast.error('გთხოვთ შეიყვანოთ კატეგორიის სახელი')
      return
    }

    categoryService
      .createCategory({ name: addInput.value as string })
      .then(({ data }) => {
        setCategories([...categories, data])
        handleCancel()
        toast.success('კატეგორია შექმნილია')
      })
      .catch(() => {
        toast.error('შეცდომა კატეგორიის შექმნისას')
      })
  }

  // Handle Cancel Add
  const handleCancel = () => {
    setAddMode(false)
    addInput.clear()
  }

  return (
    <div>
      <HandlerHeader handleRows={handleRows} turnAddMode={() => setAddMode(true)} />
      <div className="flex flex-col gap-2">
        <RenderCategories
          addInput={addInput}
          addMode={addMode}
          handleAdd={handleAdd}
          handleCancel={handleCancel}
          categories={categories}
          loading={loadingCategories}
          selectedRowKeys={selectedRowKeys}
          handleRowSelection={handleRowSelection}
          categoriesLength={categories.length}
        />
      </div>
    </div>
  )
}

export default Categories
