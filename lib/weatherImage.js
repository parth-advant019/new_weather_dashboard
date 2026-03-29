export function getWeatherImage(code) {
  if (code === 0) return "/images/img_clear_sun.png"; // clear
  // cloudy
  if (code === 1 || code === 2 || code === 3) {
    return "/images/img_sun.png";
  }
  // fog
  if (code === 45 || code === 48) {
    return "/images/img_fog.png";
  }
  // rain
  if (
    (code >= 51 && code <= 55) ||
    (code >= 61 && code <= 65) ||
    (code >= 80 && code <= 82)
  ) {
    return "/images/rain_img.png";
  }
  return "/images/img_sun.png";
}
