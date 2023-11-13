
import Footer from '../features/footer/Footer'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product/components/ProductList'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <ProductList/>
        <Footer/>
    </div>
  )
}

export default Home