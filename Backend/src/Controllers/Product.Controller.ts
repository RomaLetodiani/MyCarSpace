import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import ProductServices from "../Services/Product.Service"

class ProductController {
  private ProductServices: ProductServices
  constructor() {
    this.ProductServices = new ProductServices()
  }

  getProducts = asyncHandler(async (req: Request, res: Response) => {
    const params = req.query
    const result = await this.ProductServices.findAll(params)
    res.status(200).json(result)
  })

  getProduct = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await this.ProductServices.findOne({ id })
    res.status(200).json(result)
  })

  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const productData = req.body

    const result = await this.ProductServices.create(productData)
    res.status(201).json(result)
  })

  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id
    const productData = req.body

    const result = await this.ProductServices.update({ id, productData })
    res.status(200).json(result)
  })

  archiveProducts = asyncHandler(async (req: Request, res: Response) => {
    const ids = req.body.ids

    const result = await this.ProductServices.archive({ ids })
    res.status(200).json(result)
  })

  restoreProducts = asyncHandler(async (req: Request, res: Response) => {
    const ids = req.body.ids

    const result = await this.ProductServices.restore({ ids })
    res.status(200).json(result)
  })

  deleteProducts = asyncHandler(async (req: Request, res: Response) => {
    const ids = req.body.ids

    const result = await this.ProductServices.delete({ ids })
    res.status(200).json(result)
  })
}

export default new ProductController()
