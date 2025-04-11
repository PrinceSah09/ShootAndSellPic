import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const provider = new GoogleAuthProvider();

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

const Auth = () => {
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    try {
      const userCred = isRegister
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      const user = userCred.user;
      dispatch(
        setUser({ uid: user.uid, email: user.email, photoURL: user.photoURL })
      );
      toast("Logged in successfully");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast("Login failed", {
        description: "Error: " + err.message,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("result => ", result.user.photoURL);
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
      toast("Logged in successfully");
      navigate("/");
    } catch (error) {
      toast("Google Sign-In failed", {
        description: "Error: " + (error as Error).message,
      });
    }
  };

  return (
    <div className="flex min-h-[36rem] my-12">
      {/* Left: Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1513909768583-afba6a563286?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Auth illustration"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Right: Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-8">
        <h2 className="text-3xl font-bold mb-6">
          {isRegister ? "Register" : "Login"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-sm"
        >
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          <Button type="submit" className="w-full text-white">
            {isRegister ? "Create Account" : "Login"}
          </Button>
        </form>

        <p
          className="text-sm text-gray-600 cursor-pointer mt-2"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </p>

        <hr className="w-full max-w-sm my-4" />
        <Button
          className="w-full max-w-sm bg-blue-600 text-white"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Auth;
