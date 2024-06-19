import { productCreateDTO, productParamsDTO } from "../DTO/Product.dto"
import { idDTO, idsDTO } from "../DTO/Shared.dto"
import { CustomError } from "../Error/CustomError"
import { Product } from "../Models/Product.Model"
import CategoryServices from "./Category.Service"

const productNotFoundError = new CustomError("Product not found", 404)

class ProductServices {
  private categoryServices: CategoryServices
  constructor() {
    this.categoryServices = new CategoryServices()
  }
  findAll = async (criteria: productParamsDTO) => {
    const {
      category,
      isArchived,
      maxPrice,
      minPrice,
      onlySales,
      title,
      page = 1,
      pageSize = 10,
    } = criteria

    const query: any = {}

    // Calculate offset and limit
    const limit = pageSize
    const skip = (page - 1) * pageSize

    // Find category by name
    let categoryId
    if (category) {
      const categoryFromDb = await this.categoryServices.findOneByName({ name: category })
      if (!categoryFromDb) return { products: [], total: 0 }
      categoryId = categoryFromDb._id
    }

    // Apply filters based on provided criteria
    if (category) query.category = categoryId
    if (typeof isArchived !== "undefined") query.isArchived = isArchived
    if (title) query.title = { $regex: title, $options: "i" }
    if (onlySales) query.salePrice = { $ne: null }

    // Handling price filters
    if (minPrice || maxPrice) {
      query.$or = []

      // Define the min and max price conditions for salePrice and regular price
      const salePriceCondition: any = {}
      const regularPriceCondition: any = {}

      if (minPrice) {
        salePriceCondition.salePrice = { $gte: minPrice }
        regularPriceCondition.price = { $gte: minPrice }
      }

      if (maxPrice) {
        salePriceCondition.salePrice = { ...salePriceCondition.salePrice, $lte: maxPrice }
        regularPriceCondition.price = { ...regularPriceCondition.price, $lte: maxPrice }
      }

      // Add conditions to query
      if (Object.keys(salePriceCondition).length > 0) {
        salePriceCondition.salePrice = { ...salePriceCondition.salePrice, $ne: null }
        query.$or.push(salePriceCondition)
      }

      if (Object.keys(regularPriceCondition).length > 0) {
        query.$or.push(regularPriceCondition)
      }
    }
    // Count total matching documents
    const total = await Product.countDocuments(query)

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .populate("category")
      .skip(skip)
      .limit(limit)

    return {
      products,
      total,
    }
  }

  findOne = async ({ id }: idDTO) => {
    const product = await Product.find({ _id: id }).populate("category")
    if (!product) throw productNotFoundError
    return product
  }

  create = async (productData: productCreateDTO) => {
    const product = new Product({
      ...productData,
      imageUrls: productData.imageUrls.map((b64) => "data:image/png;base64," + b64),
    })
    await product.save()
    return product
  }

  update = async ({ id, productData }: { id: string; productData: productCreateDTO }) => {
    const imageUrls = productData.imageUrls.map((b64) => "data:image/png;base64," + b64)
    const product = await Product.findOneAndUpdate(
      { _id: id },
      { ...productData, imageUrls },
      { new: true },
    ).populate("category")
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
