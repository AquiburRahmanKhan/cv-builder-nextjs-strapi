import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";

interface MediaProps {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
    };
  };
}

export default function Media({ data }: { data: MediaProps }) {
  const imgUrl = getStrapiMedia(data.data.attributes.url);
  return (
    <Image
      src={imgUrl || ""}
      alt={data.data.attributes.alternativeText || "none provided"}
      className="object-cover w-full h-auto rounded-t-md overflow-hidden"
      width={400}
      height={400}
    />
  );
}
