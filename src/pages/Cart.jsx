import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem"
 

const Cart = () => {
  const cart = useSelector((state) => (Array.isArray(state.cart) ? state.cart : []));
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(
      cart.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0)
    );
  }, [cart]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: items list */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Your Cart ({cart.length})</h2>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <CartItem key={item.id || index} item={item} itemIndex={index} />
              ))}
            </div>
          </div>

          {/* Right: summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 bg-white border rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Items ({cart.length})</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>

              <div className="border-t my-4" />

              <div className="flex justify-between items-center">
                <p className="text-base font-bold">Total</p>
                <p className="text-xl font-extrabold text-green-600">${totalAmount.toFixed(2)}</p>
              </div>

              <button className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Checkout Now
              </button>

              <Link to="/" className="block text-center mt-3 text-sm text-gray-600 hover:underline">
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <Link to="/">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Shop now</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
