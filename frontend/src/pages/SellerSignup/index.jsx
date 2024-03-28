import classes from "./index.module.scss"
import { Link, useNavigate } from "react-router-dom"
import { toast, Toaster } from 'react-hot-toast';
// import axios from "axios"

const SellerSignUp = () => {
  const navigate = useNavigate()

  const handleSellerSignUp = async (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value
    const phone = document.getElementById("phone").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const confirm_password = document.getElementById("confirm_password").value

    if (password !== confirm_password) {
      toast.error("Passwords do not match")
      return
    }

    const response = await fetch("http://localhost:8000/seller/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, phone, username, password })
    })

    if (response.status === 201) {
      const result = await response.json();
      localStorage.setItem("token", result.token)
      toast.success("Seller account created successfully")
      navigate("/seller")
    } else {
      const result = await response.json();
      toast.error(result.message)
    }
  }

  return (
    <div className={classes.sell}>
      <div className={classes.heading}>
        <h3>You have a product to sell?</h3>
        <p>Create an account to start selling</p>
      </div>
      <form onSubmit={handleSellerSignUp} className={classes.signup}>
        <div className={classes.form_group}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter your email address" />
        </div>
        <div className={classes.form_group}>
          <label htmlFor="phone">Phone/Whatsapp Number</label>
          <p>Start with your country code e.g +23480123456789 for Nigerians</p>
          <input type="tel" id="phone" placeholder="Enter your phone/whatsapp number" />
        </div>
        <div className={classes.form_group}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" />
        </div>
        <div className={classes.form_group}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <div className={classes.form_group}>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input type="password" id="confirm_password" placeholder="Confirm your password" />
        </div>
        <button type="submit">Create Account</button>
        <p>
          Already have seller account{" "}
          <Link to="/seller/login">Login</Link>
        </p>
      </form>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default SellerSignUp;