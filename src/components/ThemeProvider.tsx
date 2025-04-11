// src/components/ThemeProvider.tsx
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    const className = "dark";
    const element = document.documentElement;

    if (isDarkMode) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [isDarkMode]);

  return <>{children}</>;
};

export default ThemeProvider;
