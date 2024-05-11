import "./index.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/") {
        return;
      }
      if (!navbarRef.current) return;

      const secondSectionHeight = window.innerHeight + navbarRef.current.offsetHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= secondSectionHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <>
      <div ref={navbarRef} className={location.pathname === "/" ? `app__navbar ${isFixed ? 'fixed' : ''}` : location.pathname !== "/" ? "app__navbar white_nav" : "app__navbar"} >
        <img src="/logo.png" alt="logo" />
        <ul>
          <li>
            <Link to="/" className={location.pathname === "/" ? "activelink" : ""}>Home</Link>
          </li>
          <li>
            <Link to="/products" className={location.pathname === "/products" ? "activelink" : ""}>Products</Link>
          </li>
          <li>
            <Link to="/seller" className={location.pathname === "/seller" ? "activelink" : ""}>Sell a Product</Link>
          </li>
        </ul>
      </div>

      <div ref={navbarRef} className={location.pathname === "/" ? `app__navbar-responsive ${isFixed ? 'fixed-responsive' : ''}` : location.pathname !== "/" ? "app__navbar-responsive white_nav" : "app__navbar-responsive"}>
        <img src="/logo.png" alt="logo" />
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
        {isMenuOpen && (
          <ul>
            <li>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </button>
            </li>
            <li>
              <Link to="/" className={location.pathname === "/" ? "activelink" : ""} onClick={() => setIsMenuOpen(!isMenuOpen)}>Home</Link>
            </li>
            <li>
              <Link to="/products" className={location.pathname === "/products" ? "activelink" : ""} onClick={() => setIsMenuOpen(!isMenuOpen)}>Products</Link>
            </li>
            <li>
              <Link to="/seller" className={location.pathname === "/seller" ? "activelink" : ""} onClick={() => setIsMenuOpen(!isMenuOpen)}>Sell a Product</Link>
            </li>
          </ul>
        )}
      </div>
    </>
  )
}

export default Navbar;