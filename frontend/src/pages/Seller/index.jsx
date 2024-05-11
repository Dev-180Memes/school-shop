/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import classes from './index.module.scss'
import { toast, Toaster } from 'react-hot-toast'
import { decodeJWT } from '../../utils/decodeToken'
import { useNavigate } from 'react-router-dom'

const Seller = () => {
  const [sellerId, setSellerId] = useState('');
  const [sellerProduct, setSellerProduct] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = decodeJWT(token)
      // check if token has expired
      if (decodedToken && decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem('token')
        navigate('/seller/login')
      } else {
        setSellerId(decodedToken.id)
      }
    } else {
      navigate('/seller/login')
    }

    // Fetch Seller Products
    fetch(`http://localhost:8000/products/seller/${sellerId}`)
    .then(response => response.json())
    .then(result => {
      setSellerProduct(result)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [navigate, sellerId])

  // console.log(sellerId)

  const handleProductUpload = async (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const price = document.getElementById('price').value
    const description = document.getElementById('description').value
    const category = document.getElementById('category').value
    const image = document.getElementById('image').files[0]
    let imageUrl;

    // Upload Image to Imgbb and get Url
    const formData = new FormData();
    formData.append('image', image);
    fetch('https://api.imgbb.com/1/upload?key=8abdbad2335b4f5dcac281c6e08ac5b3', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(result => {
      imageUrl = result.data.url;
      fetch("http://localhost:8000/addproducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          price,
          description,
          category,
          imageUrl,
          seller: sellerId
        })
      })
      .then(response => response.json())
      .then(result => {
        // console.log('Success:', result);
        document.getElementById('name').value = ''
        document.getElementById('price').value = ''
        document.getElementById('description').value = ''
        document.getElementById('category').value = ''
        document.getElementById('image').value = ''
        toast.success('Product added successfully')
      })
      .catch(error => {
        console.error('Error:', error);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

  }

  const handleProductDelete = (id) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
      // console.log('Success:', result);
      toast.success('Product deleted successfully')
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    const oldPassword = document.getElementById('old_password').value
    const newPassword = document.getElementById('new_password').value
    const confirmPassword = document.getElementById('confirm_password').value

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    fetch(`http://localhost:8000/seller/${sellerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        oldPassword,
        newPassword
      })
    })
    .then(response => response.json())
    .then(result => {
      // console.log('Success:', result);
      document.getElementById('old_password').value = ''
      document.getElementById('new_password').value = ''
      document.getElementById('confirm_password').value = ''
      toast.success(result.message)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className={classes.seller}>
        <h1>Upload Product</h1>
        {/* Form to add product */}
        <form className={classes.product_upload} onSubmit={handleProductUpload}>
          <div className={classes.form_group}>
            <label htmlFor="name">Product Name</label>
            <input type="text" id="name" />
          </div>
          <div className={classes.form_group}>
            <label htmlFor="price">Price</label>
            <input type="number" id="price" />
          </div>
          <div className={classes.form_group}>
            <label htmlFor="description">Description</label>
            <textarea id="description"></textarea>
          </div>
          <div className={classes.form_group}>
            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              {/* <option value="" disabled selected>Select Category</option> */}
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          <div className={classes.form_group}>
            <label htmlFor="image">Product Image</label>
            <input type="file" id="image" />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* Show sellers products with delete button */}
      <div className={classes.seller_products}>
        <h1>Your Products</h1>
        <div className={classes.products}>
          {sellerProduct.map(product => (
            <div key={product._id} className={classes.product}>
              <img src={product.imageUrl} alt={product.name} />
              <div className={classes.product_details}>
                <h3>{product.name}</h3>
                <p>Price: #{product.price}</p>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                <button onClick={() => handleProductDelete(product._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Change Seller Password */}
      <div className={classes.change_password}>
        <h1>Change Password</h1>
        <form className={classes.change_password_form} onSubmit={handleChangePassword}>
          <div className={classes.form_group}>
            <label htmlFor="old_password">Old Password</label>
            <input type="password" id="old_password" />
          </div>
          <div className={classes.form_group}>
            <label htmlFor="new_password">New Password</label>
            <input type="password" id="new_password" />
          </div>
          <div className={classes.form_group}>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input type="password" id="confirm_password" />
          </div>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </>
  )
}

export default Seller