import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  Seller,
  SellerSignUp,
} from './pages';
import { Navbar } from './components';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/seller/signup" element={<SellerSignUp />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;