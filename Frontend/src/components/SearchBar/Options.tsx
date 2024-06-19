import { Link } from 'react-router-dom'
import Button from '../UI/Button'
import Option from './Option'
import FilterStore, { IProduct } from '../../Stores/Filter.Store'

type OptionsProps = {
  loading: boolean
  searchInput: string
  searchResults: IProduct[]
  total: number
  error: boolean
}

const Options = ({ loading, searchInput, searchResults, total, error }: OptionsProps) => {
  const { setFilterParams } = FilterStore()
  return (
    <div className="absolute z-[999] drop-shadow-lg w-full md:w-[95.7%] bg-white flex flex-col overflow-y-auto max-h-[450px] border rounded-b-xl">
      {!searchResults.length && (
        <div className="p-5">
          {renderConditionals({ loading, error, length: searchResults.length })}
        </div>
      )}
      {searchResults.map((course, index) => (
        <Option key={index} {...course} />
      ))}
      {searchResults.length > 0 && (
        <div className="p-5 flex flex-col gap-2 items-center justify-center">
          <p>სულ: {total} პროდუქტი</p>
          <Link to="/shop">
            <Button
              onClick={() =>
                setFilterParams({
                  title: searchInput,
                  category: undefined,
                  maxPrice: 1000,
                  minPrice: 0,
                  onlySales: false,
                  page: 1,
                })
              }
              btnType="secondary"
            >
              მეტის ნახვა
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Options

const renderConditionals = ({
  loading,
  error,
  length,
}: {
  loading: boolean
  error: boolean
  length: number
}) => {
  if (loading) return <div>იტვირთება</div>
  if (error) return <div>პროდუქტი ვერ მოიძებნა</div>
  if (!error && !loading && !length) return <div>ჩაწერეთ სასურველი პროდუქტი</div>
  return null
}
