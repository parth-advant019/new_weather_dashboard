import Wrapper from "./Wrapper";

export default async function WeatherSection({ lat, lon, name, unit }) {
  // ✅ fake delay to test suspense
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/weather?lat=${lat}&lon=${lon}&unit=${unit}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch weather");

  const weatherData = await res.json();

  return <Wrapper weatherData={weatherData} coords={{ lat, lon, name }} />;
}
