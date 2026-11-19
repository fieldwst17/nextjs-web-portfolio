import {
  Geist,
  Geist_Mono,
  Space_Grotesk,
  IBM_Plex_Sans_Thai,
} from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Navbar from "./components/Navbar";
import Ambient from "./components/Ambient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plexThai = IBM_Plex_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Wongsathorn — Portfolio",
  description: "Personal portfolio website",
};

export const viewport = {
  themeColor: "#06040b",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${plexThai.variable} antialiased`}
      >
        <Ambient />
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
