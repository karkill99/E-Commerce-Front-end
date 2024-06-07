import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const addTocartHandler = () => {};
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        <ProductCard
          productId="hdkfhd"
          name="MacBook"
          price={64899}
          stock={3764}
          handler={addTocartHandler}
          photo="https://m.media-amazon.com/images/I/31ilq3hPhEL._SY445_SX342_QL70_FMwebp_.jpg"
        />
      </main>
    </div>
  );
};

export default Home;
