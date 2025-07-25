import { Geist, Geist_Mono } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aasan Order",
  description: "A Restaurant Order Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
    
        {children}
        <ToastContainer/>
      </body>
    </html>
  );
}
