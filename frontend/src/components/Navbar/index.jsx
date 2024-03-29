import { Link } from "react-router-dom";
import classes from "./index.module.scss";
import { FaSearch } from "react-icons/fa"
import { useState } from "react";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = () => {

  }
  return (
    <div className={classes.navbar}>
      <div className={classes.logo}>
        <Link to={"/"}>Student Shop</Link>
      </div>

      <div className={classes.search}>
        <input type="text" placeholder="search" value={searchInput} onChange={setSearchInput} />
        <FaSearch width={5} height={5} onClick={handleSearch}/>
      </div>

      <div className={classes.links}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/seller" className={classes.seller}>
          Sell a Product
        </Link>
      </div>
    </div>
  )
}

export default Navbar;