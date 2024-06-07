import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [isValidCouponCode, setIsValidCouponCode] = useState(false);
  const [discount, setDiscount] = useState(0);

  const shippingCharges = 200;

  useEffect(() => {
    // Fetch cart data from the server
    const fetchCartData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/cart");
        const data = await response.json();
        setCartItems(data.items);
        setSubtotal(data.subtotal);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (Math.random() > 0.5) {
        setIsValidCouponCode(true);
        setDiscount(400); // Set discount if the coupon is valid
      } else {
        setIsValidCouponCode(false);
        setDiscount(0); // No discount if the coupon is invalid
      }
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
      setDiscount(0); // Reset discount when the component unmounts or couponCode changes
    };
  }, [couponCode]);

  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax + shippingCharges - discount;

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => <CartItem key={idx} cartItem={i} />)
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <p>
          Discount: <em className="red">- ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
