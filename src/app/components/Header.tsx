"use client";

import Link from "next/link";
import { clientEnv } from "@/config/env";
import CartButton from "./CartButton";

export default function Header() {
  const brand = clientEnv.brandName;
  const prefix = brand.slice(0, 5); // SWEET
  const suffix = brand.slice(5);    // DEO

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link href="/">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                <span className="text-emerald-600">{prefix}</span>
                <span className="text-gray-800">{suffix}</span>
              </h1>
            </Link>
            <div className="flex items-center gap-1.5">
              {["4", "F", "R", "E", "E"].map((char, i) => (
                <span
                  key={i}
                  className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-emerald-500 text-white text-sm font-bold"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/sponsor"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 text-pink-600 text-sm font-medium hover:bg-pink-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Sponsor
            </Link>
            <CartButton />
          </div>
        </div>
        <p className="mt-2 text-gray-500 text-sm sm:text-base text-center sm:text-left">
          피부에 순한 4가지 FREE 데오드란트 컬렉션
        </p>
      </div>
    </header>
  );
}
