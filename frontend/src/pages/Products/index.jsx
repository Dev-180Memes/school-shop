import { useState, useEffect } from 'react';

import classes from './index.module.scss';
// import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/products')
    .then(response => response.json())
    .then(result => {
      setProducts(result)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [])

  console.log(products);

  return (
    <div className={classes.products}>
      <h1>Products</h1>
      <div className={classes.products__container}>
        {products.map(product => (
          <div key={product._id} className={classes.product}>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>{product.description}</p>
            <p>Price: #{product.price}</p>
            {/* Add a button that links to sellers whatsapp */}
            <a href={`https://wa.me/${product.seller.phoneNo}?text=I'm intrested in buying your ${product.name} which is listed on SchoolShop`}>Contact Seller</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products;