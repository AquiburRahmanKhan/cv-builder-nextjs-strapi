import RootLayout from "../../components/RootLayout";

export default function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return <RootLayout params={params}>{children}</RootLayout>;
}
