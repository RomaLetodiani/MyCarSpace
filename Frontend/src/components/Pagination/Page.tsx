import { twMerge } from 'tailwind-merge'

type PageProps = {
  page: number | string
  currentPage: number
  isFirstRange: boolean
  isLastRange: boolean
  isInRange: boolean
  onClick: () => void
}

const Page = ({ page, currentPage, isFirstRange, isLastRange, isInRange, onClick }: PageProps) => {
  const isActive = page === currentPage
  return (
    <div
      onClick={() => {
        if (page === currentPage || page === '...') {
          return
        }
        onClick()
      }}
      className={twMerge(
        'rounded-full border p-2 w-8 h-8 flex justify-center items-center cursor-pointer transition-all duration-200 hover:bg-primary/20 hover:border-secondary',
        isActive && 'bg-primary/20 border-secondary',
        !isInRange && !(isFirstRange || isLastRange) && 'hidden',
      )}
    >
      {page}
    </div>
  )
}

export default Page
