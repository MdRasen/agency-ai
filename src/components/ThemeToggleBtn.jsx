import { useEffect } from "react";
import assets from "../assets/assets";

const ThemeToggleBtn = ({ theme, setTheme }) => {
  //    get theme from window local storage
  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(theme || (prefersDarkMode ? "dark" : "light"));
  });

  //    set theme in local storage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <>
      <button>
        <img
          src={theme === "dark" ? assets.sun_icon : assets.moon_icon}
          alt={theme === "dark" ? "sun_icon" : "moon_icon"}
          className="size-8.5 p-1.5 border border-gray-500 rounded-full"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      </button>
    </>
  );
};

export default ThemeToggleBtn;
