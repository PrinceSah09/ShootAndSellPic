import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the item structure
interface BuyNowItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface BuyNowState {
  item: BuyNowItem | null;
}

// Initial state
const initialState: BuyNowState = {
  item: null,
};

// Create a slice for buy now functionality
const buyNowSlice = createSlice({
  name: "buyNow",
  initialState,
  reducers: {
    // Set the item to buy now
    buyNowItem: (state, action: PayloadAction<BuyNowItem>) => {
      state.item = action.payload;
    },

    // Clear the buy now item
    clearBuyNowItem: (state) => {
      state.item = null;
    },
  },
});

export const { buyNowItem, clearBuyNowItem } = buyNowSlice.actions;
export default buyNowSlice.reducer;
