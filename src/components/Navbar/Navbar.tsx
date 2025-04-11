import { FaBars, FaRegUserCircle } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toggleTheme } from "@/redux/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { clearUser } from "@/redux/slices/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const cartItem = useSelector((state: RootState) => state.cart.items);
  const photoURL = useSelector((state: RootState) => state.auth.user?.photoURL);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  // const user = useSelector((state: RootState) => state.auth.user);
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
  };

  // Handle theme toggle
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const navigate = useNavigate();

  return (
    <nav className="p-4 w-full mt-6 dark:bg-black bg-white rounded-2xl top-8 z-50">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          <p className="text-black dark:text-white">ShootAndSell</p>
        </Link>

        <div className="hidden md:flex space-x-6 text-lg cursor-pointer">
          <Link to="/" className="transition-colors">
            <p className="text-black dark:text-white">Home</p>
          </Link>
          <Link to="/products" className="hover:text-primary transition-colors">
            <p className="text-black dark:text-white">Products</p>
          </Link>
          <Link to="/cart" className="hover:text-primary transition-colors">
            <p className="text-black dark:text-white">Cart</p>
          </Link>
        </div>

        <div className="flex items-center space-x-4 cursor-pointer">
          <Link to="/cart" className="relative">
            <Button size="icon" className="relative cursor-pointer">
              <LuShoppingCart className="text-xl dark:text-white text-white hover:text-primary transition-colors bg-transparent" />
              <span className="absolute -top-1 -right-1 text-xs rounded-full h-4 w-4 flex items-center justify-center dark:bg-white dark:text-black bg-black text-white">
                {cartItem.length}
              </span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="h-10 w-10 rounded-2xl flex items-center">
                {/* {photoURL ? (
                  <img
                    className="rounded-full border-2 border-black"
                    src={photoURL}
                    alt="photoURL"
                  />
                ) : ( */}
                <FaRegUserCircle className="h-8 w-8" />
                {/* )} */}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {!isLoggedIn ? (
                <DropdownMenuItem onClick={() => navigate("/auth")}>
                  Login
                </DropdownMenuItem>
              ) : (
                <>
                  {/* <DropdownMenuItem disabled>Hi, {user?.email}</DropdownMenuItem> */}
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem onClick={handleToggle}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menubar for Mobile Devices */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <FaBars />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products">Products</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">About</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
