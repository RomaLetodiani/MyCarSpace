import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import CategoryServices from "../Services/Category.Service"

class CategoryController {
  private CategoryServices: CategoryServices
  constructor() {
    this.CategoryServices = new CategoryServices()
  }

  getCategories = asyncHandler(async (req: Request, res: Response) => {
    const params = req.query
    const result = await this.CategoryServices.findAll(params)
    res.status(200).json(result)
  })

  getCategory = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await this.CategoryServices.findOneById({ id })
    res.status(200).json(result)
  })

  createCategory = asyncHandler(async (req: Request, res: Response) => {
    const categoryData = req.body

    const result = await this.CategoryServices.create(categoryData)
    res.status(201).json(result)
  })

  updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id
    const categoryData = req.body

    const result = await this.CategoryServices.update({ id, categoryData })
    res.status(200).json(result)
  })

  archiveCategories = asyncHandler(async (req: Request, res: Response) => {
    const ids = req.body.ids

    const result = await this.CategoryServices.archive({ ids })
    res.status(200).json(result)
  })

  restoreCategories = asyncHandler(async (req: Request, res: Response) => {
    const ids = req.body.ids

    const result = await this.CategoryServices.restore({ ids })
    res.status(200).json(result)
  })

  deleteCategories = asyncHandler(async (req: Request, res: Response) => {
    const ids = req.body.ids

    const result = await this.CategoryServices.delete({ ids })
    res.status(200).json(result)
  })
}

export default new CategoryController()
