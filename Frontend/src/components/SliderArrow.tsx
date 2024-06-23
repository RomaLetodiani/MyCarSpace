import { twMerge } from 'tailwind-merge'

type Props = {
  direction: 'left' | 'right'
  onClick: () => void
}

const SliderArrow = ({ direction, onClick }: Props) => {
  const isLeft = direction === 'left'
  return (
    <div
      className={twMerge(
        'absolute w-10 h-full cursor-pointer',
        'flex items-center justify-center',
        isLeft ? 'left-0' : 'right-0',
      )}
      onClick={onClick}
    >
      <span
        className={twMerge(
          'px-2 py-10 text-xl border rounded-full',
          'flex items-center justify-center',
          'transition-all duration-300 ease-in-out',
          'bg-slate-100 hover:bg-slate-200',
          isLeft && 'transform rotate-180',
        )}
      >
        &gt;
      </span>
    </div>
  )
}

export default SliderArrow
