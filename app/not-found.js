import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-3">
      <p className="text-gray-700 text-lg">City not found!</p>
      <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        Go Home
      </Link>
    </div>
  );
}
