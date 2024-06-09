import { twMerge } from 'tailwind-merge'

type BurgerProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Burger = ({ open, setOpen }: BurgerProps) => {
  const lineStyle =
    'bg-gradient-to-r from-skyBlue to-oceanBlue w-full h-1 transition-all duration-500 ease-in-out rounded-xl'
  return (
    <button
      className={twMerge(
        'flex flex-col z-[100] justify-between w-8 bg-transparent border-none cursor-pointer relative',
        open ? 'h-8' : 'h-6',
      )}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className={twMerge(lineStyle, open ? 'rotate-45 absolute top-1/2' : 'rotate-0')} />
      <div
        className={twMerge(
          lineStyle,

          open ? 'opacity-0 absolute top-1/2' : 'opacity-100 duration-1000',
        )}
      />
      <div className={twMerge(lineStyle, open ? '-rotate-45 absolute top-1/2' : 'rotate-0')} />
    </button>
  )
}

export default Burger
