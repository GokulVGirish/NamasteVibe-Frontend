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
                <Image className="h-16 w-auto" src={logo} alt="Website Logo" />
              </Link>

              <p className="sr-only">Website Title</p>
            </span>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <a
              aria-current="page"
              className="inline-block rounded-lg px-2 py-1 text-base font-medium text-gray-200 transition-all duration-200 hover:bg-gray-700 hover:text-white"
              href="#"
            >
              How it works ?
            </a>
            {/* Uncomment if needed */}
            {/* <a
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-200 transition-all duration-200 hover:bg-gray-700 hover:text-white"
              href="#"
            >
              Pricing
            </a> */}
          </div>
          <div className="flex items-center justify-end gap-3">
            <a
              className="hidden items-center justify-center rounded-xl bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-200 shadow-sm ring-1 ring-inset ring-gray-600 transition-all duration-150 hover:bg-gray-600 sm:inline-flex"
              href="/login"
            >
              Sign in
            </a>
            <button className="inline-flex items-center justify-center rounded-xl bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
