
import AdminProductList from '../features/admin/components/AdminProductList'
import Footer from '../features/footer/Footer'
import Navbar from '../features/navbar/Navbar'


const AdminHome = () => {
  return (
    <div>
        <Navbar/>
        <AdminProductList/>
        <Footer/>
    </div>
  )
}

export default AdminHome