import { twMerge } from 'tailwind-merge'

type PageProps = {
  page: number
  currentPage: number
  isFirst: boolean
  isLast: boolean
  onClick: () => void
}

const Page = ({ page, currentPage, isFirst, isLast, onClick }: PageProps) => {
  const isActive = page === currentPage
  const isInRange = page + 1 === currentPage || page - 1 === currentPage
  return (
    <div
      onClick={onClick}
      className={twMerge(
        'rounded-full border p-2',
        isActive && 'bg-primary/20 border-secondary',
        !isInRange && !(isFirst || isLast) && 'hidden',
      )}
    >
      {page}
    </div>
  )
}

export default Page
