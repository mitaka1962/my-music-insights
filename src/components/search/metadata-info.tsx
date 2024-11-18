import SpotifyButton from "@/components/search/spotify-button";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";

export default function MetadataInfo({
  type,
  title,
  artists,
  albumName,
  albumId,
  releaseDate,
  spotifyUrl,
}: {
  type: 'track' | 'album' | 'single' | 'compilation';
  title: string;
  artists: Array<{
    name: string;
  }>;
  albumName?: string;
  albumId?: string;
  releaseDate: number;
  spotifyUrl: string;
}) {
  return (
    <div className="card card-bordered">
      <div className="card-body gap-6">
        <div className="flex flex-col gap-3">
          <span className="w-fit px-3 py-0.5 bg-base-content/5 rounded-md font-medium text-sm">{capitalizeFirstLetter(type)}</span>
          <h1 className="card-title text-4xl font-extrabold">{title}</h1>
        </div>   
        <div className="grow flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="badge badge-outline flex-none mt-0.5">Artist</div>
            <div className="grow">{artists.map((artist: { name: string; }) => artist.name).join(', ')}</div>
          </div>
          {albumName ? (
            <div className="flex gap-2">
              <div className="badge badge-outline flex-none mt-0.5">Album</div>
              <div className="grow">
                <Link className="link link-hover" href={`/search/album/${albumId ?? ''}`}>{albumName}</Link>
              </div>
            </div>
          ) : null}
          <div className="flex gap-2">
            <div className="badge badge-outline flex-none mt-0.5">Release</div>
            <div className="grow">{releaseDate}</div>
          </div>  
        </div>
        <div className="flex justify-end">
          <SpotifyButton href={spotifyUrl} />
        </div> 
      </div>
    </div>
  );
}
