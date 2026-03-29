import Wrapper from "@/components/ui/Wrapper";

const DEFAULT_LAT = 23.0225;
const DEFAULT_LON = 72.5714;
const DEFAULT_NAME = "Ahmedabad";

export default async function Home({ searchParams }) {
  const params = await searchParams;

  const lat = params?.lat ? Number(params.lat) : DEFAULT_LAT;
  const lon = params?.lon ? Number(params.lon) : DEFAULT_LON;
  const name = params?.name || DEFAULT_NAME;
  const unit = params?.unit || "celsius";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/weather?lat=${lat}&lon=${lon}&unit=${unit}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch weather");

  const weatherData = await res.json();

  return (
    <>
      <Wrapper weatherData={weatherData} coords={{ lat, lon, name }} />
    </>
  );
}
