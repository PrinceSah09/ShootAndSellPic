import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
// import storageSession from "redux-persist/lib/storage/session";
import themeReducer from "./slices/themeSlice";
import cartReducer from "./slices/cartSlice";
import buyNowReducer from "./slices/buyNowSlice";
import authReducer from "./slices/authSlice";
import localStorage from "redux-persist/lib/storage";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["theme", "cart", "auth"],
};

// Combine all reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  cart: cartReducer,
  buyNow: buyNowReducer,
  auth: authReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create a persistor for the store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
