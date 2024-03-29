import classes from "./index.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <>
      <div className={classes.hero}>
        <div className={classes.content}>
          <div className={classes.text}>
            <h2>Shop for Used/Pre Owned Materials</h2>
            <p>A shop for students by students. Buy all preowned/used items and more from student sellers</p>
            <Link to={"/products"} className={classes.button}>
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div className={classes.products}>
        <h2>Latest Products</h2>
        <div className={classes.productList}>
          {products.map(product => (
            <div className={classes.product} key={product._id}>
              <img src={product.imageUrl} alt={product.name} />
              <div className={classes.productInfo}>
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>{product.description}</p>
                <p>Price: #{product.price}</p>
                <a href={`https://wa.me/${product.seller.phoneNo}?text=I'm intrested in buying your ${product.name} which is listed on SchoolShop`}>Contact Seller</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home;