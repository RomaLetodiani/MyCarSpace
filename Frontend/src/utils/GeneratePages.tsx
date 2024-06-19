export const generatePageNumbers = (page: number, totalPages: number) => {
  const pages: (string | number)[] = []
  const maxPagesToShow = 7
  const firstThreePages = [1, 2, 3]
  const lastThreePage = totalPages

  if (totalPages <= maxPagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // Always show the first three pages
  pages.push(...firstThreePages)

  // Show '...' if current page is greater than 5
  if (page > 3) {
    pages.push('...')
  }

  // Show current page and its adjacent pages
  if (page > 3 && page < totalPages - 1) {
    pages.push(page - 1, page, page + 1)
  }

  // Show adjacent pages if page is 3 or 4
  if (page === 3 || page === 4) {
    pages.push(4)
  }

  if (page === lastThreePage || page === totalPages - 1) {
    pages.push(totalPages - 2, totalPages - 1)
  }

  // Show '...' if current page is less than totalPages - 4
  if (page < totalPages - 4) {
    pages.push('...')
  }

  // Always show the last three pages
  pages.push(lastThreePage)

  // Ensure no duplicate pages
  return pages.filter((p, index) => {
    if (p === '...') {
      return pages[index - 1] !== '...'
    }
    return pages.indexOf(p) === index
  })
}
