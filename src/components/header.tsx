import Image from "next/image";
import logo from "/public/namasteVibeLogo.png";

import Link from "next/link";
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-700  bg-gradient-to-b from-gray-800 to-gray-600 py-3 shadow-lg backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <span aria-current="page" className="flex items-center">
              <Link href="/">
                <Image className="h-16 w-auto " src={logo} alt="Website Logo" />
              </Link>

              <p className="sr-only">Website Title</p>
            </span>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <Link
              aria-current="page"
              className="inline-block rounded-lg px-2 py-1 text-base font-medium text-gray-200 transition-all duration-200 hover:bg-gray-700 hover:text-white"
              href="#"
            >
              How it works ?
            </Link>
            {/* Uncomment if needed */}
            {/* <a
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-200 transition-all duration-200 hover:bg-gray-700 hover:text-white"
              href="#"
            >
              Pricing
            </a> */}
          </div>
          <div className="flex items-center justify-end gap-3">
            <Link
              href="/support"
              className="inline-flex items-center justify-center rounded-lg bg-gray-800 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              Support Creator
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
