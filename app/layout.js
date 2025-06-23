import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Oluwafemi Onadokun",
  description: "The digital playground of Oluwafemi Onadokun — crafting elegant, performant, and human-centered web experiences.",
  icons: {
    icon: "/images/shaka-2.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
