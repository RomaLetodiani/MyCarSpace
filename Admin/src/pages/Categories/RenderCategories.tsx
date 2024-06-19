import { ICategory } from '../../store/Global.Store'
import Category from './Category'
import CategoryAddModal, { CategoryAddModalProps } from './CategoryAdd.Modal'

type Props = CategoryAddModalProps & {
  categoriesLength: number
  loading: boolean
  addMode: boolean
  categories: ICategory[]
  selectedRowKeys: string[]
  handleRowSelection: (id: string) => void
}

const RenderCategories = ({
  categoriesLength,
  loading,
  addMode,
  categories,
  selectedRowKeys,
  handleRowSelection,
  ...categoryAddModalProps
}: Props) => {
  const noData = !categoriesLength && !addMode && !loading
  const hasData = !!categoriesLength && !loading

  // Handle Loading and No Data States
  if (loading || noData) {
    return (
      <div className="p-5 mt-5 text-center rounded-lg bg-secondary/20 text-primary shadow-2xl">
        <p>{loading && 'იტვირთება კატეგორიები...'}</p>
        <p>{noData && 'გთხოვთ დაამატოთ კატეგორია'}</p>
      </div>
    )
  }

  // Handle Add Mode
  if (addMode) {
    return <CategoryAddModal {...categoryAddModalProps} />
  }

  // Handle Categories Data
  if (hasData) {
    return (
      <div className="grid grid-cols-1 gap-3 mt-5">
        {categories.map((category) => (
          <Category
            key={category._id}
            category={category}
            rowSelection={selectedRowKeys}
            handleRowSelection={handleRowSelection}
          />
        ))}
      </div>
    )
  }
}

export default RenderCategories
