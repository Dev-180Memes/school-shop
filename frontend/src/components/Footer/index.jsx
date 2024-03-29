import classes from "./index.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes.footer__logo}>
          <h1>School Shop</h1>
        </div>
        <div className={classes.footer__links}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/seller">Seller</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;