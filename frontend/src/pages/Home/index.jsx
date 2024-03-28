import classes from "./index.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
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
      {/* Todo: Add Products component and Footer */}
    </>
  )
}

export default Home;