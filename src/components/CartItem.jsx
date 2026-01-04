import { FcDeleteDatabase } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { removeAll } from "../redux/Slices/CartSlice";
import { incrementStockBy } from "../redux/Slices/InventorySlice";
import toast from "react-hot-toast";

const CartItem = ({ item, itemIndex }) => {
  const dispatch = useDispatch();
  const removeFromCart = () => {
    const qty = item.quantity || 1;
    dispatch(removeAll(item.id));
    dispatch(incrementStockBy({ id: item.id, qty }));
    toast.success("Item removed");
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        <img
          src={item.image}
          alt={item.title || "cart item"}
          className="object-contain w-full h-full"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/logo.png";
            e.currentTarget.src = "/logo.png";
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{item.title}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
      </div>

      <div className="flex flex-col items-end space-y-2">
        <p className="text-green-600 font-bold">${item.price}</p>
        <button
          onClick={removeFromCart}
          aria-label={`Remove ${item.title} from cart`}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-red-50 text-red-600"
        >
          <FcDeleteDatabase size={20} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
