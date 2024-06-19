import { twMerge } from 'tailwind-merge'
import FilterStore, { ICategory } from '../../Stores/Filter.Store'
import useMediaQuery from '../../hooks/useMediaQuery'
import { useState } from 'react'
import Burger from '../../components/Burger'
import Button from '../../components/UI/Button'
import CheckBox from '../../components/UI/CheckBox'
import Selector from '../../components/UI/Selector'
import Input from '../../components/UI/Input'
import useDebounce from '../../hooks/useDebounce'
import { useInput } from '../../hooks/useInput'

const Filters = () => {
  const { setFilterParams, filterParams, totalProducts, categories } = FilterStore()
  const isNotMobile = useMediaQuery('(min-width: 768px)')
  const [isOpen, setIsOpen] = useState(false)
  const [onlySales, setOnlySales] = useState(filterParams.onlySales || false)
  const [minPrice, setMinPrice] = useState(filterParams.minPrice || 0)
  const [maxPrice, setMaxPrice] = useState(filterParams.maxPrice || 1000)
  const titleInput = useInput(() => true, filterParams.title || '')

  const priceOptions = [0, 50, 100, 200, 300, 400, 500, 750, 1000].map((price) => ({
    value: price,
    title: `${price}₾`,
  }))

  const handleTitleFilter = (title: string) => {
    if (!title) {
      setFilterParams({ title: undefined })
      return
    }
    setFilterParams({
      title,
    })
  }

  useDebounce(() => handleTitleFilter(titleInput.value as string), 500, [titleInput.value])

  const handlePriceFilter = () => {
    setFilterParams({
      minPrice,
      maxPrice,
      onlySales,
    })
    setIsOpen(false)
  }

  const handleCategoryClick = (category: string | undefined) => {
    setFilterParams({ category })
    setIsOpen(false)
  }

  return (
    <>
      {!isNotMobile && (
        <div
          className={twMerge(
            'absolute z-30 top-0 h-[50px] w-full px-5 py-2 flex items-center justify-between',
            'shadow-[0px_5px_20px_-5px_rgba(0,0,0,0.3)] text-primary',
          )}
        >
          <p
            className="text-lg cursor-pointer font-bold"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            ფილტრები <span className="ml-1 text-sm">სულ ({totalProducts} პროდუქტი)</span>
          </p>
          <Burger open={isOpen} setOpen={setIsOpen} />
        </div>
      )}
      <div
        className={twMerge(
          'transition-all duration-500 ease-in-out text-primary',
          isNotMobile
            ? 'flex flex-col shadow-[5px_0px_20px_-5px_rgba(0,0,0,0.3)]'
            : `absolute left-0 ${
                isOpen ? '-bottom-[50px]' : '-bottom-full'
              } w-full h-full bg-white/90 backdrop-blur-sm z-20`,
        )}
      >
        <div className="p-5 py-6 flex flex-row flex-wrap md:flex-col gap-5">
          {isNotMobile && (
            <div>
              <p className="text-lg cursor-pointer font-bold">
                ფილტრები <span className="ml-1 text-sm">სულ ({totalProducts} პროდუქტი)</span>
              </p>
            </div>
          )}
          <div>
            <Input label="დასახელება" {...titleInput} />
          </div>
          {categories.length && (
            <div>
              <h3 className="font-extrabold text-2xl">კატეგორია</h3>
              <ul className="flex flex-col gap-2 text-lg">
                <li
                  className={twMerge('', !filterParams.category && 'font-bold text-primary-500')}
                  onClick={() => handleCategoryClick(undefined)}
                >
                  ყველა
                </li>
                {categories?.map((category: ICategory) => (
                  <li
                    className={twMerge(
                      '',
                      filterParams.category === category.name && 'font-bold text-primary-500',
                    )}
                    onClick={() => handleCategoryClick(category.name)}
                    key={category._id}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="font-extrabold text-2xl mb-1">
              ფასი <span className="text-xs">(ლარი)</span>
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-start gap-1">
              <Selector
                selected={minPrice}
                setSelected={(number) => setMinPrice(+number)}
                options={priceOptions}
                label="დან"
                defaultText="ფასი"
              />
              <Selector
                selected={maxPrice}
                setSelected={(number) => setMaxPrice(+number)}
                options={priceOptions}
                label="მდე"
                defaultText="ფასი"
              />
            </div>
          </div>
          <div>
            <div
              className={twMerge('bg-slate-300/20 p-1 rounded-xl', onlySales && 'bg-secondary/20')}
            >
              <CheckBox
                id="onlySales"
                checked={onlySales}
                onChange={() => setOnlySales((prev) => !prev)}
                withText
                checkedText="მხოლოდ ფასდაკლებები"
                uncheckedText="მხოლოდ ფასდაკლებები"
              />
            </div>
            <Button
              className="bg-primary text-white py-2 px-4 rounded-xl mt-5"
              onClick={handlePriceFilter}
            >
              გაფილტვრა
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filters
