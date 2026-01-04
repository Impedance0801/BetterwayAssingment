import { useDispatch, useSelector } from "react-redux";
import { add, removeAll } from "../redux/Slices/CartSlice";
import { decrementStock, incrementStockBy } from "../redux/Slices/InventorySlice";
import { toast } from "react-hot-toast";

const Product = ({ post }) => {
  const cart = useSelector((state) => state.cart || []);
  const remaining = useSelector((state) => state.inventory?.stock?.[post.id] ?? 3);
  const cartItem = cart.find((p) => p.id === post.id) || null;
  const cartQty = cartItem?.quantity || 0;

  const dispatch = useDispatch();

  const addToCart = () => {
    if (!remaining || remaining <= 0) {
      toast.error("Item is out of stock");
      return;
    }
    dispatch(decrementStock(post.id));
    dispatch(add(post));
    toast.success("Item added to cart");
  };

  const removeFromCart = () => {
    if (!cartQty) return;
    dispatch(removeAll(post.id));
    dispatch(incrementStockBy({ id: post.id, qty: cartQty }));
    toast.success("Item removed");
  };

  return (
    <div className="flex flex-col items-center justify-between hover:scale-110 transition duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded  outline">
      <div>
        <p
          className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1
         "
        >
          {post.title}
        </p>
      </div>
      <div>
        <p className="w-40 text-gray-400 font-normal text-[10px] text-left ">
          {post.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>
      <div className="h-[180px]">
        <img
          src={post.image}
          className="h-full w-full"
          alt={post.title || "product"}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/logo.png";
          }}
        />
      </div>

      <div className="flex justify-between  gap-12 items-center w-full mt-5">
        <div>
          <p className="text-green-600 font-semibold "> ${post.price}</p>
          <div className="mt-1">
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800">Qty: {remaining}</span>
          </div>
        </div>

        {cartQty > 0 ? (
          <div className="flex items-center gap-2">
            <button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
              onClick={addToCart}
              disabled={remaining <= 0}
            >
              +
            </button>
            <div className="text-sm font-medium">{cartQty}</div>
            <button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
              onClick={removeFromCart}
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            disabled={remaining <= 0}
            className={`text-gray-700 border-2 border-gray-700 rounded-full  font-semibold text-[12px] p-1 px-3 uppercase transition duration-300 ease-in ${remaining <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700 hover:text-white'}`}
            onClick={addToCart}
          >
            {remaining <= 0 ? 'Out of stock' : 'Add To Cart'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
