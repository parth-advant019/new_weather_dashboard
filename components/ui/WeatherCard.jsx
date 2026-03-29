export default function WeatherCard({ title, value, unit }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-2xl font-semibold mt-2">
        {value}
        <span className="text-base font-normal text-gray-600">{unit}</span>
      </p>
    </div>
  );
}
