import SpotifyButton from "@/components/search/spotify-button";

export default function MetadataInfo({
  type,
  title,
  artists,
  albumName,
  releaseDate,
  spotifyUrl,
}: {
  type: 'Track' | 'Album';
  title: string;
  artists: string;
  albumName?: string;
  releaseDate: number;
  spotifyUrl: string;
}) {
  return (
    <div className="card card-bordered">
      <div className="card-body gap-6">
        <div className="flex flex-col gap-3">
          <span className="w-fit px-3 py-0.5 bg-gray-100 rounded-md font-medium text-sm">{type}</span>
          <h1 className="card-title text-4xl font-extrabold">{title}</h1>
        </div>   
        <div className="grow flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="badge badge-outline flex-none mt-0.5">Artist</div>
            <div className="grow">{artists}</div>
          </div>
          {albumName ? (
            <div className="flex gap-2">
              <div className="badge badge-outline flex-none mt-0.5">Album</div>
              <div className="grow">{albumName}</div>
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
