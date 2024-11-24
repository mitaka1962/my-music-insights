import Image from "next/image";
import { Track } from "@/lib/definitions";
import { getSpotifyMinImageUrl } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function TrackListItem({
  item,
  idx,
  handleRemove,
}: {
  item: Track;
  idx: number;
  handleRemove?: (idx: number) => void;
}) {
  return (
    <div className={clsx("flex gap-4 py-1.5 px-5 rounded-xl items-center border border-base-content/15 animate-fadein-up",
      { 'hover:border-base-content/60' : handleRemove }
    )}>
      <div className="text-lg w-4 text-center text-base-content/80">{idx + 1}</div>
      <Image
        className="rounded-sm border border-base-content/5"
        src={getSpotifyMinImageUrl(item)}
        alt={`${item.name}のジャケット画像`}
        width={64}
        height={64}
        unoptimized={true} />        
      <div className="grow min-w-0 h-[64px] flex flex-col justify-center">
        <div className="font-medium truncate">{item.name}</div>
        <div className="text-base-content/80 text-sm truncate">{item.artists[0].name}</div>
      </div>
      {handleRemove ? (
        <button className="transition-transform hover:opacity-70 active:scale-90" onClick={() => handleRemove(idx)}>
          <XMarkIcon className="w-6" />
        </button> 
      ) : null}
    </div>
  );
}
