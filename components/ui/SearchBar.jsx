"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (value.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${value}`,
        );

        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (err) {
        console.error(err);
      }
    }, 400);
  };

  const handleSelect = (place) => {
    router.push(
      `/?lat=${place.latitude}&lon=${place.longitude}&name=${place.name}`,
    );
    setCity("");
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (!city) return;

    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    } else {
      router.push("/not-found");
    }
  };

  return (
    <div className="relative flex gap-2 mb-4 dark:text-white">
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={handleChange}
        className="border p-2 rounded w-full dark:border-white"
      />

      {suggestions.length > 0 && (
        <ul className="absolute top-12 left-0 w-full bg-white dark:bg-gray-800 border rounded shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((place, index) => (
            <li
              key={index}
              onClick={() => handleSelect(place)}
              className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {place.name}, {place.country}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}
