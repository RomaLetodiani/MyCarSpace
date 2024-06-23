import { create } from 'zustand'
import { IProduct } from './Filter.Store'

interface IGlobalStore {
  products: IProduct[]
  setProducts: (products: IProduct[]) => void
  saleProducts: IProduct[]
  setSaleProducts: (products: IProduct[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

const GlobalStore = create<IGlobalStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  saleProducts: [],
  setSaleProducts: (saleProducts) => set({ saleProducts }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}))

export default GlobalStore
