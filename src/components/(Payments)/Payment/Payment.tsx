import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { DevTool } from "@hookform/devtools";

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Function to trigger confetti animation
  const handleClick = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  // Setup react-hook-form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
  });

  // State for processing payment and message
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  // Handle payment processing
  const onSubmit = async (data: unknown) => {
    setIsProcessing(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage("Processing payment...");
      setMessage("Buy Successful!");
      console.log("Feedback submitted:", data);
      dispatch(clearCart());
      handleClick();
      navigate("/feedback-form");
      reset();
      toast("Thanks for you Feedback!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      {/* Left Side: Cart Items */}
      <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-start justify-between p-2 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:shadow-md w-full h-40"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-16 object-cover rounded-lg"
                />
                <h3 className="text-md font-semibold text-center dark:text-white">
                  {item.name}
                </h3>
                <p className="text-gray-800 dark:text-gray-300">
                  ₹ {item.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Payment Form */}
      {/* Right Side: Payment Form */}
      <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg h-fit">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Payment Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name input */}
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              Name
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Enter Name"
                  {...field}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Invalid phone number",
                },
              }}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  {...field}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                />
              )}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              Address
            </label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Enter Address"
                  {...field}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                />
              )}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <p className="text-lg font-bold mb-4 dark:text-white">
            Total: ₹ {totalAmount}
          </p>

          {message ? (
            <p
              className={`text-center ${
                isProcessing ? "text-blue-500" : "text-green-500"
              } dark:text-white`}
            >
              {message}
            </p>
          ) : (
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300 dark:bg-green-600 dark:hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Make Payment"}
            </button>
          )}
        </form>
      </div>
      <DevTool control={control} />
    </div>
  );
};

export default Payment;
