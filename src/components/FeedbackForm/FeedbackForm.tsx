import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { DevTool } from "@hookform/devtools";
import { toast } from "sonner";

const FeedbackForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Form setup for feedback submission
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Function to handle form submission
  const onSubmit = async (data: unknown) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Feedback submitted:", data);
      reset();
      navigate("/");
      toast("Thanks for you Feedback!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl border mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 my-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Share Your Feedback
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Name
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  id="name"
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 dark:border-gray-600 dark:text-white"
                  placeholder="John Doe"
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

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg  dark:border-gray-600 dark:text-white"
                  placeholder="john@example.com"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <Controller
            name="message"
            control={control}
            rules={{ required: "Message is required" }}
            render={({ field }) => (
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border rounded-lg dark:border-gray-600 dark:text-white"
                placeholder="Share your thoughts..."
                {...field}
              />
            )}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 text-white font-medium rounded-lg w-[11rem] h-[3rem]
              ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <ScaleLoader
                  className="items-center m-auto"
                  height={12}
                  color="white"
                />
              </span>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default FeedbackForm;
