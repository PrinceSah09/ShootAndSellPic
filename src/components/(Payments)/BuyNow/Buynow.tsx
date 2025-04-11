import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { buyNowItem } from "@/redux/slices/buyNowSlice";
import { useState } from "react";
import { DevTool } from "@hookform/devtools";

const Buynow: React.FC = () => {
  const navigate = useNavigate();
  const buyNowItems = useSelector((state: RootState) => state.buyNow.item);

  // State for processing payment and message
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const totalAmount = buyNowItems ? buyNowItems?.price : 0;

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
      phone: "",
      address: "",
    },
  });

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

  // Handle form submission
  const onSubmit = () => {
    setIsProcessing(true);
    setMessage("Processing payment...");
    setTimeout(() => {
      setIsProcessing(false);
      setMessage("Buy Successful!");
      reset();
      handleClick();
      navigate("/feedback-form");
    }, 2000); // Simulate a delay for payment processing
  };

  return (
    <div className="w-full mt-16">
      <div className="max-w-7xl mx-auto h-full flex flex-col md:flex-row gap-6">
        {/* Left Side: Item Display */}
        <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg flex-1">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
            Your Item
          </h2>

          {!buyNowItem ? (
            <p className="text-gray-500 dark:text-gray-300 text-center py-10">
              No item selected for purchase.
            </p>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <img
                  src={buyNowItems?.imageUrl}
                  alt={buyNowItem.name}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold dark:text-white mb-2">
                    {buyNowItem.name}
                  </h3>
                  <p className="text-gray-800 dark:text-gray-300 text-lg mb-4">
                    ₹ {buyNowItems?.price.toLocaleString()}
                  </p>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="font-medium dark:text-white">
                      Product Details
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      High-quality print ready for framing. Ships within 3-5
                      business days.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-lg font-bold dark:text-white">
                    Total: ₹ {totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Payment Form */}
        <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg w-full md:w-96">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Payment Details
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1">
                Name
              </label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <input
                    id="name"
                    type="text"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                    placeholder="Enter Name"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <Controller
                name="phone"
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
                    id="phone"
                    type="text"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                    placeholder="Enter Phone Number"
                    {...field}
                  />
                )}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <input
                    id="address"
                    type="text"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
                    placeholder="Enter Address"
                    {...field}
                  />
                )}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="pt-4">
              {message ? (
                <p
                  className={`text-center py-3 ${
                    isProcessing ? "text-blue-500" : "text-green-500"
                  } dark:text-white`}
                >
                  {message}
                </p>
              ) : (
                <button
                  type="submit"
                  disabled={!buyNowItem}
                  className={`w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300 dark:bg-green-600 dark:hover:bg-green-700 ${
                    !buyNowItem ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Make Payment
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <DevTool control={control} />
    </div>
  );
};

export default Buynow;
