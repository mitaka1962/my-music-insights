import { Album, Track } from "@/lib/definitions";
import { getSpotifyMinImageUrl } from "@/lib/utils";
import Image from "next/image";

export default function SearchResultCard({
  result,
}: {
  result: Track | Album;
}) {
  return (
    <div className="flex gap-3 py-2 px-2 rounded hover:bg-base-content/20 hover:opacity-80 active:opacity-60">
      <div className="flex-none h-[64px] overflow-hidden aspect-square rounded-sm border border-base-content/5">
        <Image
          src={getSpotifyMinImageUrl(result)}
          alt={`${result.name}のジャケット画像`}
          width={64}
          height={64}
          unoptimized={true} />
      </div>              
      <div className="flex-auto min-w-0 h-[64px] flex flex-col py-1">
        <div className="font-medium truncate">{result.name}</div>
        <div className="text-base-content/80 text-sm truncate">{result.artists[0].name}</div>
      </div>
    </div>
  );
}
