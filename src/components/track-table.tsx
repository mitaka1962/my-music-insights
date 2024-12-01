import Image from "next/image";
import { Track } from "@/lib/definitions";
import { convertTime, getSpotifyMinImageUrl } from "@/lib/utils";
import SpotifyButton from "./spotify-button";
import Link from "next/link";

export default function TrackTable({
  trackList,
}: {
  trackList: Track[];
}) {
  return (
    <table className="table table-pin-cols">
      <thead>
        <tr>
          <th></th>
          <th>Image</th>
          <th>Title</th>
          <th>Artist</th>
          <th>Duration</th>
          <th>Link</th>
        </tr>            
      </thead>
      <tbody>
        {trackList.map((track, idx) => (
          <tr key={track.id} className="hover transition-opacity">
            <td>{idx + 1}</td>
            <td>
              <Image
                className="w-[64px] aspect-square object-cover rounded border border-base-content/5"
                src={getSpotifyMinImageUrl(track)}
                alt={`${track.name}のジャケット画像`}
                width={64}
                height={64}
                unoptimized={true} />
            </td>
            <td className="w-80 max-w-80">
              <Link className="link-hover text-sm" href={`/search/track/${track.id}`}>
                <div className="truncate">{track.name}</div>
              </Link>
            </td>
            <td className="w-40 max-w-40"><div className="truncate">{track.artists[0].name}</div></td>
            <td>{convertTime(track.duration_ms)}</td>
            <td>
              <SpotifyButton href={track.external_urls.spotify} small={true} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
