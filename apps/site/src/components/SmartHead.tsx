import { useRouter } from "next/router";
import Head from "next/head";

const baseUrl = "https://flare.js.org";
const siteName = "Flare";
const imageUrl =
  "https://repository-images.githubusercontent.com/396804402/b18f1b49-b3d8-4360-a709-bf71857c4cd4";

export default function SmartHead({
  title: titleProp,
  description,
}: {
  title?: string;
  description: string;
}) {
  const { pathname } = useRouter();
  const title = [titleProp, siteName].filter((x) => x).join(" - ");
  const url = `${baseUrl}${pathname}`;
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:image:alt" content={`${siteName} logo`} />
    </Head>
  );
}
