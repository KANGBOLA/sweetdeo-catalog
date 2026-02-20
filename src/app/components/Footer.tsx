"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            &copy; 2026 SWEETDEO. 4FREE Deodorant Collection.
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="https://github.com/KANGBOLA/sweetdeo-catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-emerald-600 transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/sponsor"
              className="text-gray-500 hover:text-pink-500 transition-colors"
            >
              Sponsor
            </Link>
            <Link
              href="/admin/login"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
