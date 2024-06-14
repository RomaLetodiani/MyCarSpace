import mongoose, { Schema, Document } from "mongoose"

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
    imageUrl: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { versionKey: false, timestamps: true },
)

export const User = mongoose.model<ProductDocument>("User", productSchema)
