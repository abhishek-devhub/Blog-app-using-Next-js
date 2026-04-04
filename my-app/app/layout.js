import { Inter } from "next/font/google";
import "./globals.css";
import Authprovider from "./Context/AuthContext";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "BlogVerse",
  description: "Blog Website",
  icons: {
    icon: '/faviconbig.png'
  }
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} antialiased `}
      >
        <SessionWrapper>
          <Authprovider>
            {children}

          </Authprovider>
        </SessionWrapper>

      </body>
    </html>
  );
}
