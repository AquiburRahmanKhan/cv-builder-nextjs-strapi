import type { Metadata } from "next";
import { getStrapiMedia, getStrapiURL } from "../utils/api-helpers";
import { fetchAPI } from "../utils/fetch-api";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";

async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
  showHeader = true,
  showFooter = true,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string };
  readonly showHeader?: boolean;
  readonly showFooter?: boolean;
}) {
  const global = await getGlobal(params.lang);
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const { navbar, footer } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data?.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data?.attributes.url
  );

  return (
    <>
      {showHeader ? (
        <Navbar
          links={navbar.links}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
        />
      ) : null}

      {/* <main className="dark:bg-black dark:text-gray-100 min-h-screen">
        {children}
      </main> */}

      <main className="min-h-screen">{children}</main>

      {showFooter ? (
        <Footer
          logoUrl={footerLogoUrl}
          menuLinks={footer.menuLinks}
          legalLinks={footer.legalLinks}
          socialLinks={footer.socialLinks}
        />
      ) : null}
    </>
  );
}
