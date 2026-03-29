"use client";

import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";

export default function Wrapper({ weatherData, coords }) {
  const [favorites, setFavorites] = useState([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavorites(stored);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newVal = !prev;
      if (newVal) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newVal;
    });
  };

  const addFavorite = (searchData) => {
    if (!searchData) return;

    setFavorites((prev) => {
      const exists = prev.find((c) => c.name === searchData.name);
      if (exists) return prev;

      const updated = [...prev, searchData];
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <SideBar
        favorites={favorites}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <Dashboard
        weatherData={weatherData}
        coords={coords}
        addFavorite={addFavorite}
        favorites={favorites}
      />
    </>
  );
}
