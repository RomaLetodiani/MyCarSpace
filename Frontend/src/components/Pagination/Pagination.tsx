import { useMemo } from 'react'
import { generatePageNumbers } from '../../utils/GeneratePages'
import Selector from '../UI/Selector'
import Page from './Page'

type PaginationProps = {
  page: number
  setPage: (page: number) => void
  pageSize: number
  totalProducts: number
}

// TODO build pagination like this (first three) ... middle ... (last three)

const Pagination = ({ page, pageSize, totalProducts, setPage }: PaginationProps) => {
  const totalPages = Math.ceil(totalProducts / pageSize)

  const pages = useMemo(() => generatePageNumbers(page, totalPages), [page, totalPages])

  return (
    <div>
      <div className="flex gap-2">
        {pages.map((p, index) => (
          <Page
            currentPage={page}
            isFirst={index === 0}
            isLast={index === pages.length - 1}
            onClick={() => {
              setPage(p as number)
            }}
            page={p as number}
            key={index}
          />
        ))}
      </div>
      <Selector
        selected={page}
        setSelected={(value) => setPage(Number(value))}
        defaultText="გვერდი"
        options={Array.from({ length: totalPages }, (_, i) => ({
          value: i + 1,
          title: `Page ${i + 1}`,
        }))}
      />
    </div>
  )
}

export default Pagination
