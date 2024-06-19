import { toast } from 'react-toastify'
import GlobalStore from '../../store/Global.Store'
import categoryService from '../../services/Category.Service'

const handleCategories = () => {
  const { categories, setCategories } = GlobalStore()

  //  Handle Archive
  const handleArchive = async (ids: string[]) => {
    const archiveId = toast.loading('კატეგორიები არქივდება...')
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
        toast.update(archiveId, {
          type: 'success',
          render: 'კატეგორია წარმატებით დაარქივებულია',
          isLoading: false,
          autoClose: 2000,
        })
      })
      .catch((error) => {
        toast.update(archiveId, {
          type: 'error',
          render: 'შეცდომა კატეგორიის დაარქივებისას',
          isLoading: false,
          autoClose: 2000,
        })
        throw error
      })
  }

  //  Handle Restore
  const handleRestore = async (ids: string[]) => {
    const restoreId = toast.loading('მიმდინარეობს კატეგორიების აღდგენა...')
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
        toast.update(restoreId, {
          type: 'success',
          render: 'კატეგორია წარმატებით აღდგა',
          isLoading: false,
          autoClose: 2000,
        })
      })
      .catch((error) => {
        toast.update(restoreId, {
          type: 'error',
          render: 'შეცდომა კატეგორიის აღდგენისას',
          isLoading: false,
          autoClose: 2000,
        })
        throw error
      })
  }

  //  Handle Delete
  const handleDelete = async (ids: string[]) => {
    const deleteId = toast.loading('მიმდინარეობს კატეგორიების წაშლა...')
    await categoryService
      .deleteCategories(ids)
      .then(() => {
        const updatedCategories = categories.filter((category) => !ids.includes(category._id))
        setCategories(updatedCategories)
        toast.update(deleteId, {
          type: 'success',
          render: 'კატეგორია წარმატებით წაიშალა',
          isLoading: false,
          autoClose: 2000,
        })
      })
      .catch((error) => {
        toast.update(deleteId, {
          type: 'error',
          render: 'შეცდომა კატეგორიის წაშლისას',
          isLoading: false,
          autoClose: 2000,
        })
        throw error
      })
  }
  return { handleArchive, handleRestore, handleDelete }
}

export default handleCategories
