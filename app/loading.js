// app/loading.js

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-3">
      <p className="text-red-500 text-lg">Loading weather...</p>
    </div>
  );
}
