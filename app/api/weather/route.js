export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const unit = searchParams.get("unit") || "celsius";

    if (!lat || !lon) {
      return Response.json({ error: "Missing lat/lon" }, { status: 400 });
    }

    // Open-Meteo API URL
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,pressure_msl&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&temperature_unit=${unit}`;
    const res = await fetch(url);
    const data = await res.json();

    return Response.json({ ...data, unit });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
