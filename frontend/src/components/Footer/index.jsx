import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./index.scss";

const Footer = () => {
  return (
    <div className="app__footer">
        <div className="app__footer-content">
            <div className="app__footer-content_about">
                <div className="logo">
                    <img src="/logo.png" alt="" />
                    <p>School Shop</p>
                </div>
            </div>
            <div className="app__footer-content_links">
                <div className="navigation">
                    <h3>Navigation</h3>
                    <ul className="links">
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/products"}>Products</Link>
                        </li>
                        <li>
                            <Link to={"/seller"}>Become a Seller</Link>
                        </li>
                    </ul>
                </div>
                {/* <div className="navigation">
                    <h3>Support</h3>
                    <ul className="links">
                        <li>
                            <Link>Contact Us</Link>
                        </li>
                        <li>
                            <Link>Support Policies</Link>
                        </li>
                        <li>
                            <Link>Help</Link>
                        </li>
                        <li>
                            <Link>Code of Conduct</Link>
                        </li>
                    </ul>
                </div> */}
            </div>
            <div className="app__footer-content_subscribe">
                <div className="content">
                    <h4>Subscribe to our Newsletter</h4>
                    <p>Want to stay up to date with news and updates? Subscribe.</p>
                </div>
                <div className="form">
                    <input type="text" placeholder="email@provider.com" />
                    <FontAwesomeIcon icon={faArrowRight} style={{color: "#0F1017",}} />
                </div>
                <p>By subscribing to our newsletter you agree to our privacy policy and will get commercial communication.</p>
            </div>
        </div>

        <div className="app__footer-sub">
            <div className="left">
                <p>
                    &copy; 2024 School Shop
                </p>
                <div className="links">
                    <ul>
                        <li>
                            <Link>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link>Terms of Service</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="right">
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faFacebook} style={{color: "#0F1017",}} />
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faTwitter} style={{color: "#0F1017",}} />
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faLinkedin} style={{color: "#0F1017",}} />
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer;