"use client";
import Image from "next/image";
import DailyChart from "../charts/DailyChart";
import HourlyChart from "../charts/HourlyChart";
import WeatherCard from "./WeatherCard";
import SearchBar from "./SearchBar";
import { getWeatherImage } from "@/lib/weatherImage";

export default function Dashboard({
  weatherData,
  coords,
  addFavorite,
  favorites,
}) {
  const weather = weatherData?.current_weather;

  // console.log("Current Weather:", data?.current_weather);
  // console.log("\nHourly data:\n", data?.hourly);
  // console.log("\nDaily data:\n", data?.daily);

  const hourlyData =
    weatherData?.hourly?.time.slice(0, 24).map((t, i) => ({
      time: t.split("T")[1],
      temp: weatherData.hourly.temperature_2m[i],
    })) || [];

  const dailyData =
    weatherData?.daily?.time.map((d, i) => ({
      day: d,
      temp: weatherData.daily.temperature_2m_max[i],
      code: weatherData.daily.weathercode?.[i],
    })) || [];

  const humidity = weatherData?.hourly?.relativehumidity_2m?.[0];
  const pressure = weatherData?.hourly?.pressure_msl?.[0];

  const weatherImage = getWeatherImage(weather?.weathercode);

  const isAlreadyFavorite = favorites?.find((c) => c.name === coords?.name);

  return (
    <div className="w-full p-4 space-y-10">
      <SearchBar />
      <div className="w-full h-50 rounded-xl overflow-hidden shadow-md">
        <Image
          src={weatherImage}
          alt="weather"
          width={1000}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-row px-1 gap-2">
        <h2 className="dark:text-white text-xl font-semibold">
          {coords?.name}
        </h2>
        {!isAlreadyFavorite && (
          <button
            onClick={() => addFavorite(coords)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            add Favorite
          </button>
        )}
      </div>

      {weather && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <WeatherCard
            title="Temperature"
            value={weather.temperature}
            unit={weatherData?.unit === "fahrenheit" ? "F" : "C"}
          />
          <WeatherCard
            title="Wind Speed"
            value={weather.windspeed}
            unit="km/h"
          />
          <WeatherCard title="Humidity" value={humidity} unit="%" />
          <WeatherCard title="Pressure" value={pressure} unit="hPa" />
        </div>
      )}

      <DailyChart data={dailyData} />
      <HourlyChart data={hourlyData} />
    </div>
  );
}
