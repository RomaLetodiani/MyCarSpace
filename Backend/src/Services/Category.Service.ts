import { categoryCreateDTO, categoryUpdateDTO } from "../DTO/Category.dto"
import { idsDTO } from "../DTO/Shared.dto"
import { CustomError } from "../Error/CustomError"
import { Category } from "../Models/Category.Model"

const categoryNotFoundError = new CustomError("Category not found", 404)

class CategoryServices {
  findAll = async (criteria: any) => {
    const categories = await Category.find(criteria).sort({ createdAt: -1 })
    return categories
  }

  findOneById = async ({ id }: { id: string }) => {
    const category = await Category.find({ _id: id })
    if (!category) throw categoryNotFoundError
    return category
  }

  findOneByName = async ({ name }: { name: string }) => {
    const category = await Category.findOne({ name })
    return category
  }

  create = async (categoryData: categoryCreateDTO) => {
    const categoryExist = await this.findOneByName({ name: categoryData.name })

    if (categoryExist) throw new CustomError("Category with that name already exists", 400)

    const category = new Category(categoryData)

    await category.save()
    return category
  }

  update = async ({ id, categoryData }: { id: string; categoryData: categoryUpdateDTO }) => {
    let category = await this.findOneByName({ name: categoryData.name })
    if (category) throw new CustomError("Category with that name already exists", 400)

    category = await Category.findOneAndUpdate({ _id: id }, categoryData, { new: true })
    if (!category) throw categoryNotFoundError
    return category
  }

  archive = async ({ ids }: { ids: idsDTO }) => {
    const result = await Category.updateMany({ _id: { $in: ids } }, { isArchived: true })
    if (result.modifiedCount === 0) throw categoryNotFoundError
    return result
  }

  delete = async ({ ids }: { ids: idsDTO }) => {
    const result = await Category.deleteMany({ _id: { $in: ids } })
    if (result.deletedCount === 0) throw categoryNotFoundError
    return result
  }

  restore = async ({ ids }: { ids: idsDTO }) => {
    const result = await Category.updateMany({ _id: { $in: ids } }, { isArchived: false })
    if (result.modifiedCount === 0) throw categoryNotFoundError
    return result
  }
}

export default CategoryServices
