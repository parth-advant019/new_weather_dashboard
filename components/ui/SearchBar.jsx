"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (!city) return;

    // Geocoding api converts city name in lat and lon
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
    );

    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const place = data.results[0];

      router.push(
        `/?lat=${place.latitude}&lon=${place.longitude}&name=${place.name}`,
      );
    } else {
      router.push("/not-found");
    }
    setCity("");
  };

  return (
    <div className="flex gap-2 mb-4 dark:text-white">
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 rounded w-full dark:border-white"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}
