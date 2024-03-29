import classes from "./index.module.scss"
import { Link } from "react-router-dom"
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { decodeJWT } from "../../utils/decodeToken";

const SellerLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeJWT(token);
      // Check if the token is expired
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem("token");
      } else {
        navigate("/seller");
      }
    }
  }, [navigate]);

  const handleSellerLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:8000/seller/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (response.status === 200) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      navigate("/seller");
    } else {
      const result = await response.json();
      toast.error(result.message);
    }
  }

  return (
    <div className={classes.login}>
      <div className={classes.heading}>
        <h3>Welcome back!</h3>
        <p>Login to your account to start selling</p>
      </div>
      <form className={classes.form} onSubmit={handleSellerLogin}>
        <div className={classes.form_group}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter your email address" />
        </div>
        <div className={classes.form_group}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <button type="submit" className={classes.submit}>Login</button>
        <p>
          Don&apos;t have an account? <Link to="/seller/signup">Create one</Link>
        </p>
      </form>
      <Toaster 
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default SellerLogin;