import { CustomError } from "../Error/CustomError"
import { Category } from "../Models/Category.Model"

const categoryNotFoundError = new CustomError("Category not found", 404)

class CategoryServices {
  findAll = async (criteria: any) => {
    const categories = await Category.find(criteria).sort({ createdAt: -1 })
    return categories
  }

  findOne = async ({ id }: { id: string }) => {
    const category = await Category.find({ _id: id, isArchived: false })
    if (!category) throw categoryNotFoundError
    return category
  }

  create = async (categoryData: any) => {
    const category = new Category(categoryData)
    await category.save()
    return category
  }

  update = async ({ id, categoryData }: { id: string; categoryData: any }) => {
    const category = await Category.findOneAndUpdate({ _id: id }, categoryData, { new: true })
    if (!category) throw categoryNotFoundError
    return category
  }

  archive = async ({ ids }: { ids: string[] }) => {
    const result = await Category.updateMany({ _id: { $in: ids } }, { isArchived: true })
    if (result.modifiedCount === 0) throw categoryNotFoundError
    return result
  }

  delete = async ({ ids }: { ids: string[] }) => {
    const result = await Category.deleteMany({ _id: { $in: ids } })
    if (result.deletedCount === 0) throw categoryNotFoundError
    return result
  }

  restore = async ({ ids }: { ids: string[] }) => {
    const result = await Category.updateMany({ _id: { $in: ids } }, { isArchived: false })
    if (result.modifiedCount === 0) throw categoryNotFoundError
    return result
  }
}

export default CategoryServices
