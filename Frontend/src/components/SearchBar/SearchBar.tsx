import { useEffect, useRef, useState } from 'react'
import { InputState } from '../../hooks/useInput'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import useClickInside from '../../hooks/useClickInside'
import Input from '../UI/Input'
import Options from './Options'
import { twMerge } from 'tailwind-merge'
import productService from '../../services/Product.Service'
import { useLocation } from 'react-router-dom'

const SearchBar = ({ searchInput }: { searchInput: InputState }) => {
  const [options, setOptions] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [total, setTotal] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    setOptions([])
    searchInput.clear()
    setLoading(false)
    setVisible(false)
    setError(false)
  }, [pathname])

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setOptions([])
      setVisible(false)
      setError(false)
      return
    }
    setLoading(true)
    productService
      .allProducts({ title: searchTerm, page: 1, pageSize: 3 })
      .then(({ data }) => {
        if (!data.products || !data.total) {
          setOptions([])
          setError(true)
          return
        }
        setOptions(data.products)
        setTotal(data.total)
        setVisible(true)
      })
      .catch((error) => {
        console.log('🔥 ~ .then ~ error:', error)
        setOptions([])
        setError(true)
      })
      .finally(() => setLoading(false))
  }

  const handleClickOutside = () => {
    setVisible(false)
  }

  const handleClickInside = () => {
    setVisible(true)
  }

  useDebounce(() => handleSearch(searchInput.value as string), 500, [searchInput.value])
  useClickInside(containerRef, handleClickInside)
  useClickOutside(containerRef, handleClickOutside)

  return (
    <div
      className={twMerge('transition-all relative ease-in-out duration-500 flex-1')}
      ref={containerRef}
    >
      <Input
        {...searchInput}
        inputClassName={`${visible && 'rounded-t-xl rounded-b-none'}`}
        placeholder="მოიძიეთ სასურველი პროდუქტი"
      />
      {visible && (
        <Options
          searchInput={searchInput.value as string}
          loading={loading}
          searchResults={options}
          total={total}
          error={error}
        />
      )}
    </div>
  )
}

export default SearchBar
