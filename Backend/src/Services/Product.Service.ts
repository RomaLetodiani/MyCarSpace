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
      pageSize = 12,
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
    if (String(onlySales) === "true") query.salePrice = { $ne: null }

    // Handling price filters
    if (minPrice || maxPrice) {
      const priceFilter: any = {}

      if (minPrice && maxPrice) {
        priceFilter.$or = [
          { salePrice: { $gte: minPrice, $lte: maxPrice } },
          { salePrice: null, price: { $gte: minPrice, $lte: maxPrice } },
        ]
      } else if (minPrice) {
        priceFilter.$or = [
          { salePrice: { $gte: minPrice } },
          { salePrice: null, price: { $gte: minPrice } },
        ]
      } else if (maxPrice) {
        priceFilter.$or = [
          { salePrice: { $lte: maxPrice } },
          { salePrice: null, price: { $lte: maxPrice } },
        ]
      }

      query.$and = [priceFilter]
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
