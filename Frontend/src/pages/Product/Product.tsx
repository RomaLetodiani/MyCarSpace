import PriceRender from '../../components/PriceRender'
import Products from '../Home/Views/Products'
import Loading from '../Loading/Loading'
import FetchProduct from './Hooks/FetchProduct'
import Images from './Images'

const Product = () => {
  const { product, loading, error } = FetchProduct()

  if (loading) return <Loading />

  if (error && !loading && !product)
    return (
      <div className="flex-1 h-full w-full text-primary flex justify-center items-center">
        <div className="text-center border-dotted border-4 border-primary px-10 py-16 rounded-full">
          <p>შეცდომა პროდუქტის</p>
          <p>ინფორმაციის მოძიებისას</p>
        </div>
      </div>
    )

  return (
    <div>
      <div className="p-5 max-w-[1300px] mx-auto">
        {product ? (
          <div className="flex flex-col gap-10 md:flex-row">
            {product.imageUrls && <Images images={product.imageUrls} />}
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-3xl mb-1 font-bold">{product.title}</h1>
                <p className="text-lg font-semibold text-gray-500">
                  კატეგორია: {product.category.name}
                </p>
              </div>
              <PriceRender price={product.price} salePrice={product.salePrice as number} />
              <div>
                <h3 className="text-lg font-semibold">აღწერა:</h3>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Products />
    </div>
  )
}

export default Product
