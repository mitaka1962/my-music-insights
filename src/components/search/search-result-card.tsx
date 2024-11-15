import { SearchResultType } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function SearchResultCard({
  id,
  type,
  image_url,
  name,
  artist_name,
}: {
  id: string;
  type: SearchResultType;
  image_url: string;
  name: string;
  artist_name: string;
}) {
  return (
    <Link href={`/search/${type}/${id}`}>
      <div className="flex gap-3 py-2 px-2 rounded hover:bg-gray-200 hover:opacity-80">
        <div className="flex-none h-[64px] overflow-hidden aspect-square rounded-sm border">
          <Image
            src={image_url}
            alt={`${name}のジャケット画像`}
            width={64}
            height={64}
            unoptimized={true} />
        </div>              
        <div className="flex-auto min-w-0 h-[64px] flex flex-col py-1">
          <div className="font-medium truncate">{name}</div>
          <div className="text-gray-600 text-sm truncate">{artist_name}</div>
        </div>
      </div>    
    </Link>
  );
}
