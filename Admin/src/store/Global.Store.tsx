import { create } from 'zustand'

interface IGlobalStore {
  products: IProduct[]
  setProducts: (products: IProduct[]) => void
  loadingProducts: boolean
  setLoadingProducts: (loading: boolean) => void
  categories: ICategory[]
  setCategories: (categories: ICategory[]) => void
  loadingCategories: boolean
  setLoadingCategories: (loading: boolean) => void
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
  products: [],
  setProducts: (products) => set({ products }),
  loadingProducts: false,
  setLoadingProducts: (loading) => set({ loadingProducts: loading }),
  categories: [],
  setCategories: (categories) => set({ categories }),
  loadingCategories: false,
  setLoadingCategories: (loading) => set({ loadingCategories: loading }),
}))

export default GlobalStore
