export const generatePageNumbers = (page: number, totalPages: number) => {
  const pages: (string | number)[] = []
  const maxPagesToShow = 7
  const firstThreePages = [1, 2, 3]
  const lastThreePages = [totalPages - 2, totalPages - 1, totalPages]

  if (totalPages <= maxPagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  pages.push(...firstThreePages)

  if (page > 5) {
    pages.push('...')
  }

  if (page > 4 && page < totalPages - 3) {
    pages.push(page - 1, page, page + 1)
  }

  if (page < totalPages - 4) {
    pages.push('...')
  }

  pages.push(...lastThreePages)

  return pages.filter((p, index) => pages.indexOf(p) === index)
}
