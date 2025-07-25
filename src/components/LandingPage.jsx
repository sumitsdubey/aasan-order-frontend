'use client'

import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 overflow-hidden">
      {/* Decorative SVG Illustration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl opacity-30 pointer-events-none select-none z-0">
        <svg viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <ellipse cx="300" cy="100" rx="280" ry="60" fill="#3b82f6" fillOpacity="0.15" />
          <ellipse cx="300" cy="120" rx="200" ry="40" fill="#2563eb" fillOpacity="0.10" />
        </svg>
      </div>
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 animate-fade-in-up drop-shadow-lg">
          Welcome to <span className="text-orange-600 dark:text-orange-400">TableServe</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl animate-fade-in-up delay-100">
          Effortlessly book your table and order your favorite dishes at our restaurant.<br className="hidden md:inline" /> Enjoy a seamless dining experience with our easy-to-use order booking system.
        </p>
        <Link href="/login">
          <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white dark:text-zinc-900 font-semibold rounded-md text-lg shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 animate-fade-in-up delay-200">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Home;

/*
Add the following to your global CSS for fade-in animation:

@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.4,0,0.2,1) both;
}
.animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
.animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
*/
