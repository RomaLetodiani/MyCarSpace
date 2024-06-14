import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import CategoryServices from "../Services/Category.Service"

class CategoryController {
  private CategoryServices: CategoryServices
  constructor() {
    this.CategoryServices = new CategoryServices()
  }

  getCategories = asyncHandler((req: Request, res: Response) => {
    const params = req.query
    const result = this.CategoryServices.findAll(params)
    res.status(200).json(result)
  })

  getCategory = asyncHandler((req: Request, res: Response) => {
    const id = req.params.id

    const result = this.CategoryServices.findOne({ id })
    res.status(200).json(result)
  })

  createCategory = asyncHandler((req: Request, res: Response) => {
    const categoryData = req.body

    const result = this.CategoryServices.create(categoryData)
    res.status(201).json(result)
  })

  updateCategory = asyncHandler((req: Request, res: Response) => {
    const id = req.params.id
    const categoryData = req.body

    const result = this.CategoryServices.update({ id, categoryData })
    res.status(200).json(result)
  })

  archiveCategories = asyncHandler((req: Request, res: Response) => {
    const ids = req.body.ids

    const result = this.CategoryServices.archive({ ids })
    res.status(200).json(result)
  })

  restoreCategories = asyncHandler((req: Request, res: Response) => {
    const ids = req.body.ids

    const result = this.CategoryServices.restore({ ids })
    res.status(200).json(result)
  })

  deleteCategories = asyncHandler((req: Request, res: Response) => {
    const ids = req.body.ids

    const result = this.CategoryServices.delete({ ids })
    res.status(200).json(result)
  })
}

export default new CategoryController()
