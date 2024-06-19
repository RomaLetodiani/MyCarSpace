import { useState } from 'react'
import Filters from './Filters'
import Products from './Products'
import { twMerge } from 'tailwind-merge'

const Shop = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      className={twMerge(
        'flex-1 relative z-30 grid grid-cols-1 md:grid-cols-[300px_minmax(300px,_1500px)] md:overflow-hidden',
        !isOpen && 'overflow-hidden',
      )}
    >
      <Filters isOpen={isOpen} setIsOpen={setIsOpen} />
      <Products />
    </div>
  )
}

export default Shop
