import "./globals.css";
import { Poppins } from "next/font/google";

import { i18n } from "../../../../i18n-config";

const poppinsThin = Poppins({
  weight: "200",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins-thin",
  preload: true,
});

const poppinsLight = Poppins({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins-light",
  preload: true,
});

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins-regular",
  preload: true,
});

const poppinsSemiBold = Poppins({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins-semibold",
  preload: true,
});

const poppinsBold = Poppins({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins-bold",
  preload: true,
});

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string };
}) {
  return (
    <html
      lang={params.lang}
      className={`
       ${poppinsThin.variable}
       ${poppinsLight.variable} 
       ${poppins.variable}
       ${poppinsSemiBold.variable}
       ${poppinsBold.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
