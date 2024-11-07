import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lato, Baskervville } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-baskerville",
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
        className={`${lato.variable} ${baskerville.variable} font-sans bg-neutral-100`}
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
