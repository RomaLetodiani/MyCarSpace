import { useRef, useState } from 'react'
import { InputState } from '../../hooks/useInput'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import useClickInside from '../../hooks/useClickInside'
import Input from '../UI/Input'
import Options from './Options'
import { twMerge } from 'tailwind-merge'
import productService from '../../services/Product.Service'

const SearchBar = ({ searchInput }: { searchInput: InputState }) => {
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
    productService
      .allProducts({ productName: searchTerm, page: 1, pageSize: 20 })
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
      <Input {...searchInput} placeholder="მოიძიეთ სასურველი პროდუქტი" />
      <Options options={options} loading={loading} visible={visible} />
    </div>
  )
}

export default SearchBar
