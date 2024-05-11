/* eslint-disable no-unused-vars */
import "./index.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/products/latest')
    .then(response => response.json())
    .then(result => {
      setProducts(result)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [])

  const handleFirst = () => {
    navigate('/products')
  }

  return (
    <>
      <div className="app__home">
        <div className="app__home-content">
          <div className="app__home-content_headline">
            <h2>Shop for Used/Pre Owned Materials</h2>
            <p>A shop for students by students. Buy all preowned/used items and more from student sellers</p>
            <div className="app__home-content_container">
              <button className="first" onClick={handleFirst}>Shop Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="app__home-products">
        <h2>Latest Products</h2>
        <div className="product-list">
          {products.map(product => (
            <div className="product" key={product._id}>
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>{product.description}</p>
                <p>Price: #{product.price}</p>
                <a 
                  href={`https://wa.me/${product.seller.phoneNo}?text=I'm intrested in buying your ${product.name} which is listed on SchoolShop`} 
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact Seller
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home;