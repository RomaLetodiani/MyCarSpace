import { create } from 'zustand'

interface IGlobalStore {
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
  isArchived: boolean
  createdAt: string
  updatedAt: string
}

const GlobalStore = create<IGlobalStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}))

export default GlobalStore
