import { productCreateDTO } from "../DTO/Product.dto"
import { idDTO, idsDTO } from "../DTO/Shared.dto"
import { CustomError } from "../Error/CustomError"
import { Product } from "../Models/Product.Model"

const productNotFoundError = new CustomError("Product not found", 404)

class ProductServices {
  findAll = async (criteria: any) => {
    const products = await Product.find(criteria).sort({ createdAt: -1 }).populate("category")
    return products
  }

  findOne = async ({ id }: idDTO) => {
    const product = await Product.find({ _id: id }).populate("category")
    if (!product) throw productNotFoundError
    return product
  }

  create = async (productData: productCreateDTO) => {
    const product = new Product(productData)
    await product.save()
    return product
  }

  update = async ({ id, productData }: { id: string; productData: productCreateDTO }) => {
    const product = await Product.findOneAndUpdate({ _id: id }, productData, { new: true })
    if (!product) throw productNotFoundError
    return product
  }

  archive = async ({ ids }: { ids: idsDTO }) => {
    const result = await Product.updateMany({ _id: { $in: ids } }, { isArchived: true })
    if (result.modifiedCount === 0) throw productNotFoundError
    return result
  }

  delete = async ({ ids }: { ids: idsDTO }) => {
    const result = await Product.deleteMany({ _id: { $in: ids } })
    if (result.deletedCount === 0) throw productNotFoundError
    return result
  }

  restore = async ({ ids }: { ids: idsDTO }) => {
    const result = await Product.updateMany({ _id: { $in: ids } }, { isArchived: false })
    if (result.modifiedCount === 0) throw productNotFoundError
    return result
  }
}

export default ProductServices
