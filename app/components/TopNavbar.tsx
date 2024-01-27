"use client";

import { usePathname } from "next/navigation";
import { cx } from "../lib/cx";
import Link from "next/link";
import Image from "next/image";

const TopNavbar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b-2 bg-gray-100 px-3 lg:px-12",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex h-10 items-center justify-between w-full">
        <Link href={"/"}>
          <div className="flex items-center justify-center gap-1">
            <Image
              src={"/assets/heart.svg"}
              width={12}
              height={12}
              alt="logo"
              className="h-6 w-full"
              priority
            />
            <h1 className="text-xl whitespace-nowrap text-primary font-bold">Resume Builder & Parser</h1>
          </div>
        </Link>
        <nav
          className="flex items-center gap-3 text-sm font-medium"
          aria-label="Site Navbar"
        >
          {[
            ["/resume-builder", "Builder"],
            ["/resume-parser", "Parser"],
          ].map(([href, text]) => (
            <Link
              href={href}
              key={text}
              className="rounded-md px-1.5 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default TopNavbar;
