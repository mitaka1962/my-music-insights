import Image from "next/image";
import { getAlbumInfoData, getSeveralTracksFeaturesData } from "@/lib/getter";
import FeaturesInfo from "@/components/search/features-info";
import { calculateAverageFeature, calculateSumFeature, convertTime } from "@/lib/utils";
import SpotifyButton from "@/components/search/spotify-button";

export default async function AlbumInfo({
  id
}: {
  id: string;
}) {
  const catalogData = await getAlbumInfoData(id);
  const trakcIds = catalogData.tracks.items.map((item: {id: string}) => item.id).join(',')
  const { audio_features } = await getSeveralTracksFeaturesData(trakcIds);

  const infoList = [
    { name: 'Total Duration', value: convertTime(calculateSumFeature(audio_features, 'duration_ms')) },
    { name: 'Average BPM', value: Math.round(calculateAverageFeature(audio_features, 'tempo')) }
  ];
  const averageFeaturesData = {
    acousticness: calculateAverageFeature(audio_features, 'acousticness'),
    danceability: calculateAverageFeature(audio_features, 'danceability'),
    energy: calculateAverageFeature(audio_features, 'energy'),
    instrumentalness: calculateAverageFeature(audio_features, 'instrumentalness'),
    liveness: calculateAverageFeature(audio_features, 'liveness'),
    speechiness: calculateAverageFeature(audio_features, 'speechiness'),
    valence: calculateAverageFeature(audio_features, 'valence'),
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex-none max-w-[240px]">
          <Image
            className="shadow-md rounded-sm md:rounded"
            src={catalogData.images[0].url}
            alt={`${catalogData.name}のカバー画像`}
            width={240}
            height={240} />
        </div>
        <div className="grow card card-bordered bg-base-100 min-h-[240px]">
          <div className="card-body gap-6">
          <div className="flex flex-col gap-3">
              <span className="w-fit px-3 py-0.5 bg-gray-100 rounded-md font-medium text-sm">Album</span>
              <h1 className="card-title text-4xl font-extrabold">{catalogData.name}</h1>
            </div>   
            <div className="grow flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="badge badge-outline flex-none mt-0.5">Artist</div>
                <div className="grow">{catalogData.artists.map((artist: { name: string; }) => artist.name).join(', ')}</div>
              </div>
              <div className="flex gap-2">
                <div className="badge badge-outline flex-none mt-0.5">Album</div>
                <div className="grow">{catalogData.name}</div>
              </div>
              <div className="flex gap-2">
                <div className="badge badge-outline flex-none mt-0.5">Release</div>
                <div className="grow">{catalogData.release_date}</div>
              </div>  
            </div>
            <div className="flex gap-2 justify-end">
              <SpotifyButton href={catalogData.external_urls.spotify} />
            </div> 
          </div>
        </div>
      </div>
      <FeaturesInfo info={infoList} features={averageFeaturesData} />
    </div>
  );
}