import { create } from 'zustand'

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

export interface FilterData {
  page?: number
  pageSize?: number
  title?: string
  minPrice?: number
  maxPrice?: number
  onlySales?: boolean
  category?: string
  isArchived?: boolean
}

interface IFilterStore {
  filterParams: FilterData
  setFilterParams: (filterData: FilterData) => void
  filteredProducts: IProduct[]
  setFilteredProducts: (products: IProduct[]) => void
  clearFilters: () => void

  totalProducts: number
  setTotalProducts: (total: number) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  categories: ICategory[]
  setCategories: (categories: ICategory[]) => void
}

const defaultFilterParams: FilterData = {
  page: 1,
  pageSize: 12,
  title: undefined,
  minPrice: 1,
  maxPrice: 1000,
  onlySales: false,
  category: undefined,
  isArchived: false,
}

const FilterStore = create<IFilterStore>((set) => ({
  filterParams: defaultFilterParams,
  setFilterParams: (filterParams) =>
    set((state) => ({ filterParams: { ...state.filterParams, ...filterParams } })),
  filteredProducts: [],
  setFilteredProducts: (products) => set({ filteredProducts: products }),
  clearFilters: () => set({ filterParams: defaultFilterParams }),

  totalProducts: 0,
  setTotalProducts: (total) => set({ totalProducts: total }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  categories: [],
  setCategories: (categories) => set({ categories }),
}))

export default FilterStore
