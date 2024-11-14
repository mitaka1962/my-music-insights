import Image from "next/image";

export default function CoverImage({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) {
  return (
    <Image
      className="shadow-md rounded-sm md:rounded"
      src={imageUrl}
      alt={`${name}のカバー画像`}
      width={260}
      height={260}
      priority={true}
      unoptimized={true} />
  );
}
