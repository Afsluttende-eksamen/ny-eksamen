import { Archivo, Newsreader } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "./components/layout/NavigationWrapper";
import Footer from "./components/layout/Footer";
import { Toaster } from "sonner";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

export const metadata = {
  title: "Danser Med Piger",
  description: "Officielle hjemmeside for Danser Med Piger",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body
        className={`${archivo.variable} ${newsreader.variable} antialiased`}
      >
        <NavigationWrapper />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
