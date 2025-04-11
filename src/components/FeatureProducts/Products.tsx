import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { buyNowItem } from "@/redux/slices/buyNowSlice";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  inCart: boolean;
  quantity: number;
}

// Dummy data for products
const productList: Product[] = [
  {
    id: 1,
    name: "LA Evening",
    price: 1900,
    imageUrl:
      "https://images.unsplash.com/photo-1743349486419-e7de25c81be8?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8M",
    inCart: false,
    quantity: 0,
  },
  {
    id: 2,
    name: "Newyork town",
    price: 1200,
    imageUrl:
      "https://images.unsplash.com/photo-1715928612922-856949b2ffaf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8M",
    inCart: false,
    quantity: 0,
  },
  {
    id: 3,
    name: "Washington",
    price: 1390,
    imageUrl:
      "https://images.unsplash.com/photo-1718463315134-3ca05c2d8354?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8M",
    inCart: false,
    quantity: 0,
  },
  {
    id: 4,
    name: "Denmark Side",
    price: 1500,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1733266813596-8930bfc78a7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8M",
    inCart: false,
    quantity: 0,
  },
  {
    id: 5,
    name: "Bluebells",
    price: 9500,
    imageUrl:
      "https://images.unsplash.com/photo-1521753643072-122f97ed86e4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    inCart: false,
    quantity: 0,
  },
  {
    id: 6,
    name: "Rainforest",
    price: 8900,
    imageUrl:
      "https://images.unsplash.com/photo-1661783607532-3bb6120285b9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    inCart: false,
    quantity: 0,
  },
  {
    id: 7,
    name: "Family of deers",
    price: 1300,
    imageUrl:
      "https://images.unsplash.com/photo-1571924885859-d65a3f1a6165?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    inCart: false,
    quantity: 0,
  },
  {
    id: 8,
    name: "Untutu Forest",
    price: 8500,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1688429242656-0c334ae39fa3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    inCart: false,
    quantity: 0,
  },
  {
    id: 9,
    name: "Mountain View",
    price: 4500,
    imageUrl:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2756&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    inCart: false,
    quantity: 0,
  },
  {
    id: 10,
    name: "Polar Click",
    price: 4500,
    imageUrl:
      "https://images.unsplash.com/photo-1542312940-2b6aaa1b28eb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    inCart: false,
    quantity: 0,
  },
  {
    id: 11,
    name: "Raining in Bihar",
    price: 6400,
    imageUrl:
      "https://images.unsplash.com/photo-1551638029-cae9049add89?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    inCart: false,
    quantity: 0,
  },
];

let initialProducts: Product[] = [];

const ProductList: React.FC = () => {
  // Get cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Filter products to check if they are in the cart
  const filteredItem = productList.map((item) => {
    const cartItem = cartItems.find(
      (cartItem) => cartItem.id === String(item.id)
    );
    // If the product is in the cart, set inCart to true
    return cartItem ? { ...item, inCart: true } : item;
  });

  initialProducts = filteredItem; // Initialize products with filtered items

  const [products, setProducts] = useState(initialProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (productId: number) => {
    // Find the product by ID
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, inCart: true } : product
    );

    // Update the state with the modified products
    setProducts(updatedProducts);

    // Find the selected product and add it to the cart
    const selectedProduct = updatedProducts.find((p) => p.id === productId);
    if (selectedProduct) {
      dispatch(
        addToCart({ ...selectedProduct, id: String(selectedProduct.id) })
      );
    }
  };

  // Function to handle Buy Now button click
  const handleBuyNow = (productId: number) => {
    // Find the product by ID
    const product = products.find((p) => p.id === productId);
    // If the product is found, add it to the buy now item
    if (product) {
      dispatch(
        buyNowItem({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1, // Default quantity
        })
      );
      navigate("/buynow"); // Navigate to the Buy Now page
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-md">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-white font-semibold">₹ {product.price}</p>
          </div>
          <div className="mt-4 flex gap-2 justify-left">
            {!product.inCart ? (
              <button
                onClick={() => handleAddToCart(product.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            ) : (
              <button
                onClick={() => navigate("/cart")}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                View in Cart
              </button>
            )}
            <button
              onClick={() => handleBuyNow(product.id)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
