import mongoose, { Schema, Document } from "mongoose"
import { CustomError } from "../Error/CustomError"

export interface ProductDocument extends Document {
  title: string
  description: string
  price: number
  salePrice: number | null
  countInStock: number
  imageUrl: string
  isArchived: boolean
  category: mongoose.Types.ObjectId
}

const productSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, default: null },
    countInStock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, default: "" },
    isArchived: { type: Boolean, default: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { versionKey: false, timestamps: true },
)

productSchema.pre("save", async function (next) {
  const categoryId = this.get("category")
  const category = await mongoose.model("Category").findById(categoryId)
  if (!category) {
    throw new CustomError("Category does not exist", 400)
  }
  next()
})

export const Product = mongoose.model<ProductDocument>("Product", productSchema)
