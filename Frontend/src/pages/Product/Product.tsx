import FetchProduct from './FetchProduct'

const Product = () => {
  const { product } = FetchProduct()
  console.log('🚀 ~ Product ~ product:', product)

  return <div>Product</div>
}

export default Product
