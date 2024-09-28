import { HomeLink, homeLinks } from "@/constant/data";
import { getStatusIcon } from "@/constant/helper";
import Link from "next/link";

export default function Home() {
  return (
    <main className="page p-24">
      <div className="grid gap-2 grid-cols-2 w-full max-w-5xl">
        {homeLinks.map((link: HomeLink) => (
          <Link key={link.id} href={link.href} className="home-link">
            <div className="">
              <span className="text-lg">{link.icon} </span>
              <span>{link.title}</span>
            </div>
            <div>{getStatusIcon(link.status)}</div>
          </Link>
        ))}

        {/* OTP Input */}
        {/* Lazy Loading */}
        {/* Multiple step user login */}
        {/*AutoComplete */}
      </div>
    </main>
  );
}
