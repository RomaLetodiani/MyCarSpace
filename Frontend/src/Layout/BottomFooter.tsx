import { bottomFooterItems } from '../utils/BottomFooterItems'

const BottomFooter = () => {
  return (
    <div className="max-w-[1440px] pt-5 bg-slate-50 m-auto text-center">
      <h2 className="text-2xl font-semibold">საუკეთესო სერვისი</h2>
      <div className="grid place-items-center md:place-items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5 py-10">
        {bottomFooterItems.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[80px_220px] md:grid-cols-[80px_1fr] items-center gap-5 rounded-xl p-5 bg-gradient-to-t from-oceanBlue/20 to-white/20 border text-center md:w-full shadow-inner"
          >
            <div className="w-20 h-20">
              <img className="w-full h-full" src={item.image} alt="footer-item" />
            </div>
            <p className="font-bold">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomFooter
