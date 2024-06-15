import { create } from 'zustand'

interface IGlobalStore {
  products: IProduct[]
  setProducts: (products: IProduct[]) => void
  categories: ICategory[]
  setCategories: (categories: ICategory[]) => void
}

export interface IProduct {
  _id: string
  title: string
  description: string
  price: number
  salePrice: number | null
  countInStock: number
  imageUrls: string[]
  isArchived: boolean
  category: ICategory
  createdAt: string
  updatedAt: string
}

export interface ICategory {
  _id: string
  name: string
}

const GlobalStore = create<IGlobalStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  categories: [],
  setCategories: (categories) => set({ categories }),
}))

export default GlobalStore
