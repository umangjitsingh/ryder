import type { Metadata } from "next";
import {Arimo, Rubik} from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import {Toaster} from "react-hot-toast";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight:["300","400","500","600","700"],


});

const arimo = Arimo({
  variable: "--font-arimo",
  weight:["400","500","600","700"],
  subsets: ["latin"]
});



export const metadata: Metadata = {
    title: "RYDER: Vehicle Booking System",
  description: "RYDER is a smart mobility platform that centralizes vehicle booking into one intuitive system. It uses real‑time data, intelligent matching, and automated workflows to help users find the right vehicle instantly—whether for commuting, travel, or on‑demand needs.🚗",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${arimo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <Providers>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              border: '1px solid #713200',
              padding: '16px',
              background: "#111",
              color: "#fff",
            },
          }}
        />
      </Providers>

      </body>
    </html>
  );
}
