import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type SectionWrapperProps = {
  maxWidth?: ''
  children: ReactNode
}

const SectionWrapper = ({ maxWidth = '', children }: SectionWrapperProps) => {
  return <div className={twMerge('', maxWidth)}>{children}</div>
}

export default SectionWrapper
