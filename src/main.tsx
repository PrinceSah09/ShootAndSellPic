import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "@/components/ThemeProvider";
import Cart from "@/components/Cart/Cart.tsx";
import App from "./App.tsx";
import Layout from "@/components/Layout.tsx";
import Payment from "./components/(Payments)/Payment/Payment.tsx";
import Product from "@/components/Products/Products.tsx";
import Buynow from "./components/(Payments)/BuyNow/Buynow.tsx";
import Auth from "./components/Auth/Auth.tsx";
import { Toaster } from "@/components/Toaster";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm.tsx";

document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <BrowserRouter>
            <Toaster />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/products" element={<Product />} />
                <Route path="/buynow" element={<Buynow />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/feedback-form" element={<FeedbackForm />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
