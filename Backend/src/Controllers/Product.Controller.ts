import { Request, Response } from "express"
import asyncHandler from "express-async-handler"

class ProductController {
  // Reusable method for handling unimplemented endpoints
  private handleNotImplemented = (req: Request, res: Response) => {
    res.status(501).json({
      message: "Not Implemented Yet",
    })
  }

  getProducts = asyncHandler(this.handleNotImplemented)

  getProduct = asyncHandler(this.handleNotImplemented)

  createProduct = asyncHandler(this.handleNotImplemented)

  updateProduct = asyncHandler(this.handleNotImplemented)

  archiveProducts = asyncHandler(this.handleNotImplemented)

  deleteProducts = asyncHandler(this.handleNotImplemented)
}

export default new ProductController()
