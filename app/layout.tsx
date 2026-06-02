import type { Metadata } from "next";
import {Arimo, Rubik, Oswald} from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import {Toaster} from "react-hot-toast";
import Header from "@/app/(web)/components/Header";


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

const time=Oswald({
  variable:"--font-time",
  weight:["200","400"],
  subsets:["latin"]
})



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
      className={`${rubik.variable} ${arimo.variable} ${time.variable} h-full antialiased`}
    >
      <body className="  flex flex-col">
      <Providers>
        <Header/>
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
            }
          }}
        />

      </Providers>

      </body>
    </html>
  );
}

/*
============================================================================
  PERFORMANCE OPTIMIZATION RECOMMENDATIONS - layout.tsx
============================================================================

✅ CURRENT STRENGTHS:
- Server Component by default (good for performance)
- Font optimization using next/font (eliminates layout shift)
- Metadata exported for SEO

⚠️ IMPROVEMENTS NEEDED:

1. HEADER SERVER/CLIENT SPLIT:
   - Header is rendered as client component but could be partially server-rendered
   - Consider: Split Header into HeaderServer (static parts) + HeaderClient (interactive parts)
   - This reduces JavaScript bundle size on initial load

2. TOASTER OPTIMIZATION:
   - Toaster is rendered on every page even when not needed
   - Consider: Lazy load Toaster only on pages that use it
   - Or: Render Toaster conditionally based on route

3. BACKGROUND ELEMENTS:
   - Decorative background divs in providers.tsx are rendered on every page
   - Consider: Move to CSS as pseudo-elements or use 'content-visibility: auto'
   - This reduces DOM nodes and improves paint performance

4. FONT LOADING STRATEGY:
   - Currently loading 3 font families with multiple weights
   - Consider: Use 'display: swap' (already done by next/font)
   - Preload only critical font weights (400, 700) and lazy load others
   - Example: variable: "--font-rubik", preload: true

5. VIEWPORT CONFIGURATION:
   - Add viewport export for better mobile performance
   - export const viewport = { width: 'device-width', initialScale: 1 }

6. STATIC ASSETS OPTIMIZATION:
   - favicon.svg should be converted to multiple formats (.ico, .png)
   - Use next/image for any images in the future

7. REVALIDATION STRATEGY:
   - If layout depends on dynamic data (e.g., user preferences), add revalidation
   - export const revalidate = 3600; // Revalidate every hour

============================================================================
*/
