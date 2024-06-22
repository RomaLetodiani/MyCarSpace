import { create } from 'zustand'
import { IProduct } from './Filter.Store'

interface IGlobalStore {
  products: IProduct[]
  setProducts: (products: IProduct[]) => void
  saleProducts: IProduct[]
  setSaleProducts: (products: IProduct[]) => void
}

const GlobalStore = create<IGlobalStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  saleProducts: [],
  setSaleProducts: (saleProducts) => set({ saleProducts }),
}))

export default GlobalStore
