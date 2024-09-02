import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
      <div className="grid grid-cols-4 gap-x-2">
        <Link href="/pagination" className="home-link">📃 React Pagination Example</Link>
        <Link href="/searchfilter" className="home-link">🔍 React Search Filter Example</Link>
      </div>
    </main>
  );
}
