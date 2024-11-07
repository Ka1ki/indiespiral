import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Montserrat, Tangerine, Syne } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
});

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tangerine",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-syne",
});

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReactQueryWrapper from "@/components/ReactQueryWrapper";
import { AccountSuper } from "@/components/Super";

export const metadata = {
  title: process.env.ORG_NAME,
  description:
    "Indiespiral is a scarf company that is dedicated to providing the best quality scarves for the best price.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="corporate">
      <body
        className={`${montserrat.variable} ${tangerine.variable} ${syne.variable} font-sans bg-neutral-100`}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ReactQueryWrapper>
          <Navbar />
          <div className="pt-20">{children}</div>
          <Footer />
          <AccountSuper />
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
