import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  isDarkMode: boolean;
}

// Initial state
const initialState: ThemeState = {
  isDarkMode: false,
};

// Create a slice for theme functionality
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Toggle the theme between light and dark mode
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode;
    },

    setTheme(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
