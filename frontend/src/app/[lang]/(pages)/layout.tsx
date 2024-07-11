import "./globals.css";

import { i18n } from "../../../../i18n-config";

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
