import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartSlice";

function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };
  const handleQuantityChange = (id: string, qty: number) => {
    if (qty > 0) {
      dispatch(updateQuantity({ id, quantity: qty }));
    }
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  return (
    <div className="mx-auto mt-12 px-6 pb-24">
      {" "}
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2 rounded-xl border border-gray-400 p-1">
                <button
                  className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-300 dark:text-white rounded-full transition shadow-md"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                >
                  <FaMinus className="w-4 h-4" />
                </button>

                <span className="px-4 text-lg font-semibold">
                  {item.quantity}
                </span>

                <button
                  className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-300 dark:text-white rounded-full transition shadow-md"
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="ml-4 p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-500 transition shadow-md"
              >
                <FaTrash className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 pr-56 left-0 w-full bg-white dark:bg-gray-900 shadow-md p-4 flex justify-end items-center gap-6 border-t border-gray-300 dark:border-gray-700">
          <div className="text-xl font-semibold bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
            Total:{" "}
            <span className="text-green-600 dark:text-green-400">
              ${totalAmount.toFixed(2)}
            </span>
          </div>

          <button
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition transform"
            onClick={() => navigate("/payment")}
          >
            Check Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
