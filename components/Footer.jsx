"use client";
import Link from "next/link";
function Footer() {
  return (
    <footer className="p-10 bg-primary text-white footer footer-center text-base-content">
      <nav>
        <div className="flex items-center justify-center gap-4 text-white">
          <a>
            <svg
              className="fill-white"
              width="24"
              height="24"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32.1 43.6004C38.5065 43.6004 43.7 38.4069 43.7 32.0004C43.7 25.5939 38.5065 20.4004 32.1 20.4004C25.6935 20.4004 20.5 25.5939 20.5 32.0004C20.5 38.4069 25.6935 43.6004 32.1 43.6004Z" />
              <path d="M44.7 1H19.3C9.2 1 1 9.2 1 19.3V44.5C1 54.8 9.2 63 19.3 63H44.5C54.8 63 63 54.8 63 44.7V19.3C63 9.2 54.8 1 44.7 1ZM32.1 47.2C23.6 47.2 16.9 40.3 16.9 32C16.9 23.7 23.7 16.8 32.1 16.8C40.4 16.8 47.2 23.7 47.2 32C47.2 40.3 40.5 47.2 32.1 47.2ZM53.1 18.2C52.1 19.3 50.6 19.9 48.9 19.9C47.4 19.9 45.9 19.3 44.7 18.2C43.6 17.1 43 15.7 43 14C43 12.3 43.6 11 44.7 9.8C45.8 8.6 47.2 8 48.9 8C50.4 8 52 8.6 53.1 9.7C54.1 11 54.8 12.5 54.8 14.1C54.7 15.7 54.1 17.1 53.1 18.2Z" />
              <path d="M49.0016 11.5996C47.7016 11.5996 46.6016 12.6996 46.6016 13.9996C46.6016 15.2996 47.7016 16.3996 49.0016 16.3996C50.3016 16.3996 51.4016 15.2996 51.4016 13.9996C51.4016 12.6996 50.4016 11.5996 49.0016 11.5996Z" />
            </svg>
          </a>
          <a>
            <svg
              className="fill-white"
              width="24"
              height="24"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M59.5 1H4.5C2.5 1 1 2.6 1 4.5V59.5C1 61.5 2.6 63 4.5 63H34.1V38.9H26.1V29.6H34.1V22.7C34.1 14.7 38.9 10.3 46.1 10.3C48.5 10.3 50.9 10.4 53.3 10.7V19H48.5C44.7 19 43.9 20.8 43.9 23.5V29.4H53L51.7 38.8H43.7V62.6H59.5C61.5 62.6 63 61.1 63 59.1V4.5C62.9 2.5 61.3 1 59.5 1Z" />
            </svg>
          </a>
          <a>
            <svg
              className="fill-white"
              width="32"
              height="32"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M61.7 17.0998C61 14.3998 58.9 12.2998 56.2 11.5998C51.4 10.2998 32 10.2998 32 10.2998C32 10.2998 12.6 10.2998 7.8 11.5998C5.1 12.2998 3 14.3998 2.3 17.0998C1 21.9998 1 31.9998 1 31.9998C1 31.9998 1 42.0998 2.3 46.8998C3 49.5998 5.1 51.6998 7.8 52.3998C12.6 53.6998 32 53.6998 32 53.6998C32 53.6998 51.4 53.6998 56.2 52.3998C58.9 51.6998 61 49.5998 61.7 46.8998C63 42.0998 63 31.9998 63 31.9998C63 31.9998 63 21.9998 61.7 17.0998ZM25.8 41.2998V22.6998L41.9 31.9998L25.8 41.2998Z" />
            </svg>
          </a>
        </div>
      </nav>
      <nav className="grid grid-flow-col gap-4">
        <Link href="/contact" className="link link-hover">
          <span className="underline text-white">Contact</span>
        </Link>
        <Link href="/faqs" className="link link-hover">
          <span className="underline text-white">FAQs</span>
        </Link>
        <Link href="/terms" className="link link-hover">
          <span className="underline text-white">Terms</span>
        </Link>
        <Link href="/privacy" className="link link-hover">
          <span className="underline text-white">Privacy</span>
        </Link>
        <Link href="/shipping" className="link link-hover">
          <span className="underline text-white">Return</span>
        </Link>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by In My
          Looking Glasses
        </p>
      </aside>
      <style jsx>{`
        a {
          text-decoration-line: underline;
          color: #e11d48;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
