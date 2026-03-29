export function getWeatherIcon(code) {
  if (code === 0) return "/icons/sun.png"; // clear

  // cloudy
  if (code === 1 || code === 2 || code === 3) return "/icons/cloudy.png";

  // fog
  if (code === 45 || code === 48) return "/icons/fog.png";

  // rain
  if (
    (code >= 51 && code <= 55) ||
    (code >= 61 && code <= 65) ||
    (code >= 80 && code <= 82)
  ) {
    return "/icons/rain.png";
  }

  return "/icons/fog.png";
}
