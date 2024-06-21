import { useMemo } from 'react'
import { generatePageNumbers } from '../../utils/GeneratePages'
import Selector from '../UI/Selector'
import Page from './Page'
import useMediaQuery from '../../hooks/useMediaQuery'
import { twMerge } from 'tailwind-merge'

type PaginationProps = {
  page: number
  setPage: (page: number) => void
  pageSize: number
  totalProducts: number
}

const Pagination = ({ page, pageSize, totalProducts, setPage }: PaginationProps) => {
  const totalPages = Math.ceil(totalProducts / pageSize)
  const isNotMobile = useMediaQuery('(min-width: 768px)')

  const pages = useMemo(() => generatePageNumbers(page, totalPages), [page, totalPages])

  return (
    totalPages > 1 && (
      <div className="flex gap-3 w-full px-3 py-1 items-center justify-center">
        <div className={twMerge('flex gap-1 ', totalPages > 6 && 'min-w-[320px]')}>
          {pages.map((p, index) => (
            <Page
              currentPage={page}
              isFirstRange={index <= 3}
              isLastRange={index <= pages.length - 1}
              onClick={() => {
                setPage(p as number)
              }}
              page={p as number}
              isInRange={Number(p) + 1 === page || Number(p) - 1 === page}
              key={index}
            />
          ))}
        </div>

        <Selector
          wrapperClassName="w-16 md:w-[8rem]"
          selectorClassName="text-center max-[768px]:p-1"
          selected={page}
          setSelected={(value) => setPage(Number(value))}
          defaultText=""
          options={Array.from({ length: totalPages }, (_, i) => ({
            value: i + 1,
            title: isNotMobile ? `გვერდი ${i + 1}` : `${i + 1}`,
          }))}
        />
      </div>
    )
  )
}

export default Pagination
