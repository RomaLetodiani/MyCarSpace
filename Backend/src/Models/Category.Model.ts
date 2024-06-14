import mongoose, { Schema, Document } from "mongoose"
import { CustomError } from "../Error/CustomError"

export interface CategoryDocument extends Document {
  name: string
  isArchived: boolean
}

const categorySchema: Schema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    isArchived: { type: Boolean, required: true, default: false },
  },
  { versionKey: false, timestamps: true },
)

categorySchema.pre("updateMany", async function (next) {
  const update = this.getUpdate() as mongoose.UpdateQuery<any>

  // Check if the update is attempting to set 'archived' to true
  if (update.$set && update.isArchived === true) {
    const categoryId = this.getQuery()["_id"]
    const productsCount = await mongoose.model("Product").countDocuments({ category: categoryId })

    if (productsCount > 0) {
      throw new CustomError("Cannot archive category with associated products", 400)
    }
  }

  next()
})

categorySchema.pre("deleteMany", async function (next) {
  const categoryId = this.getQuery()["_id"]
  const productsCount = await mongoose.model("Product").countDocuments({ category: categoryId })
  if (productsCount > 0) {
    throw new CustomError("Cannot delete category with associated products", 400)
  }
  next()
})

export const Category = mongoose.model<CategoryDocument>("Category", categorySchema)
