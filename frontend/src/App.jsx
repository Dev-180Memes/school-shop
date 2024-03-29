import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  Seller,
  SellerSignUp,
  Products,
  SellerLogin
} from './pages';
import { Navbar, Footer } from './components';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/seller/signup" element={<SellerSignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path='/seller/login' element={<SellerLogin />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;