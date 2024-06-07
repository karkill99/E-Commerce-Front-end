import axios from "axios";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [pincode, setPincode] = useState("");
  const [isValidPincode, setIsValidPincode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/product/all"
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const validatePincode = () => {
    axios
      .post("http://localhost:3000/api/validate-pincode", { pincode })
      .then((response) => {
        setIsValidPincode(response.data.isValid);
      })
      .catch((error) => {
        console.error("There was an error validating the pincode!", error);
      });
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {/* {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))} */}
      </ul>
      <div>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter Pincode"
        />
        <button onClick={validatePincode}>Check Delivery</button>
        {isValidPincode !== null && (
          <p>
            {isValidPincode ? "Delivery available" : "Delivery not available"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
