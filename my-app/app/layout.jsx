import { Inter } from "next/font/google";
/* import "./globals.css"; */
import NavBar from "./NavBar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CLOTH statistics",
  description: "Statistics for CLOTH ecommerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <NavBar />
        {children}
        </body>
    </html>
  );
}
