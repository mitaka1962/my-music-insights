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
    <div className={clsx("flex gap-4 py-2 px-5 rounded-xl items-center border border-base-content/15 animate-fadein-up",
      { 'hover:border-base-content/60' : handleRemove }
    )}>
      <div className="w-4 text-center">{idx + 1}</div>
      <Image
        className="min-w-[64px] aspect-square object-cover rounded border border-base-content/5"
        src={getSpotifyMinImageUrl(item)}
        alt={`${item.name}のジャケット画像`}
        width={64}
        height={64}
        unoptimized />        
      <div className="grow min-w-0 h-[64px] flex flex-col gap-0.5 justify-center">
        <div className="truncate">{item.name}</div>
        <div className="text-base-content/70 text-sm truncate">{item.artists[0].name}</div>
      </div>
      {handleRemove ? (
        <button
          className="btn btn-sm btn-circle btn-ghost"
          onClick={() => handleRemove(idx)}
          aria-label="閉じる"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      ) : null}
    </div>
  );
}
