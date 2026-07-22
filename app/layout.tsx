import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bale Juku' Ta' | Ikan Fresh & Frozen Berkualitas",

  description:
    "Bale Juku' Ta' menyediakan ikan fresh dan frozen berkualitas dengan pilihan hasil laut terbaik.",

  keywords: [
    "ikan fresh",
    "ikan frozen",
    "jual ikan",
    "ikan segar",
    "ikan Makassar",
    "Bale Juku Ta",
  ],

  openGraph: {
    title: "Bale Juku' Ta' | Ikan Fresh & Frozen Berkualitas",

    description:
      "Bale Juku' Ta' menyediakan ikan fresh dan frozen berkualitas.",

    type: "website",

    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Logo Bale Juku' Ta'",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bale Juku' Ta' | Ikan Fresh & Frozen Berkualitas",

    description:
      "Bale Juku' Ta' menyediakan ikan fresh dan frozen berkualitas.",

    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={poppins.className}>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <FloatingWhatsApp />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
