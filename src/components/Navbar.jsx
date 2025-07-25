"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Image
          src="/globe.svg"
          alt="Logo"
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <span className="font-bold text-lg text-gray-800 dark:text-gray-100">
          TableServe
        </span>
      </div>
      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-2">
        <button className="px-4 py-2 rounded-md border border-orange-600 text-orange-600 dark:border-orange-400 dark:text-orange-400 font-medium hover:bg-orange-50 dark:hover:bg-zinc-800 transition">
          <Link href={"/login"}>Login</Link>
        </button>
        <button className="px-4 py-2 rounded-md bg-orange-600 text-white dark:bg-orange-500 dark:text-zinc-900 font-medium hover:bg-orange-700 dark:hover:bg-orange-600 transition">
          <Link href={"/register"}>Register</Link>
        </button>
      </div>
      {/* Hamburger Icon */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-100 mb-1 transition-transform ${
            menuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-100 mb-1 ${
            menuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-gray-800 dark:bg-gray-100 transition-transform ${
            menuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900 shadow-md flex flex-col items-center gap-2 py-4 md:hidden z-40 animate-fade-in">
          <button className="w-11/12 px-4 py-2 rounded-md border border-orange-600 text-orange-600 dark:border-orange-400 dark:text-orange-400 font-medium hover:bg-orange-50 dark:hover:bg-zinc-800 transition">
            <Link href={"/login"}>Login</Link>
          </button>
          <button className="w-11/12 px-4 py-2 rounded-md bg-orange-600 text-white dark:bg-orange-500 dark:text-zinc-900 font-medium hover:bg-orange-700 dark:hover:bg-orange-600 transition">
            <Link href={"/register"}>Register</Link>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
