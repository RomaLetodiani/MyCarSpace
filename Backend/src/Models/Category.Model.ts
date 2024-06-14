import mongoose, { Schema, Document } from "mongoose"

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

categorySchema.pre("deleteMany", async function (next) {
  const categoryId = this.getQuery()["_id"]
  const productsCount = await mongoose.model("Product").countDocuments({ category: categoryId })
  if (productsCount > 0) {
    throw new Error("Cannot delete category with associated products")
  }
  next()
})

export const Category = mongoose.model<CategoryDocument>("Category", categorySchema)
