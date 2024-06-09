import { useRef, useState } from 'react'
import { useInput } from '../../hooks/useInput'
import useDebounce from '../../hooks/useDebounce'
import ProductServices from '../../services/Product.Services'
import useClickOutside from '../../hooks/useClickOutside'
import useClickInside from '../../hooks/useClickInside'
import Input from '../UI/Input'
import Options from './Options'
import { twMerge } from 'tailwind-merge'

const SearchBar = () => {
  const searchInput = useInput(() => true)
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setOptions([])
      return
    }
    setLoading(true)
    ProductServices.allProducts({ productName: searchTerm, page: 1, pageSize: 50 })
      .then(({ data }) => {
        if (!data.products) {
          setOptions([])
          return
        }
        setOptions(data.products)
        setVisible(true)
      })
      .catch((error) => {
        console.log('🚀 ~ .then ~ error:', error)
        setOptions([])
      })
      .finally(() => setLoading(false))
  }

  const handleClickOutside = () => {
    setVisible(false)
  }

  const handleClickInside = () => {
    setVisible(true)
  }

  useDebounce(() => handleSearch(searchInput.value), 500, [searchInput.value])
  useClickInside(containerRef, handleClickInside)
  useClickOutside(containerRef, handleClickOutside)

  return (
    <div
      className={twMerge('transition-all ease-in-out duration-500 md:px-4 flex-1')}
      ref={containerRef}
    >
      <Input {...searchInput} placeholder="Search for products" />
      <Options options={options} loading={loading} visible={visible} />
    </div>
  )
}

export default SearchBar
