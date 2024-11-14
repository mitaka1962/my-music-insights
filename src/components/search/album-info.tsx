import { getAlbumInfoData, getSeveralTracksFeaturesData } from "@/lib/getter";
import FeaturesInfo from "@/components/search/features-info";
import { calculateAverageFeature, calculateSumFeature, convertTime } from "@/lib/utils";
import MetadataInfo from "@/components/search/metadata-info";
import CoverImage from "@/components/search/cover-image";

export default async function AlbumInfo({
  id
}: {
  id: string;
}) {
  const catalogData = await getAlbumInfoData(id);
  const trackIds = catalogData.tracks.items.map((item: {id: string}) => item.id).join(',')
  const { audio_features } = await getSeveralTracksFeaturesData(trackIds);

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
        <div className="flex-none w-1/3 max-w-[260px]">
          <CoverImage imageUrl={catalogData.images[0].url} name={catalogData.name} />
        </div>
        <div className="grow w-2/3">
          <MetadataInfo
            type={catalogData.album_type}
            title={catalogData.name}
            artists={catalogData.artists.map((artist: { name: string; }) => artist.name).join(', ')}
            releaseDate={catalogData.release_date}
            spotifyUrl={catalogData.external_urls.spotify} />
        </div>
      </div>
      <FeaturesInfo info={infoList} features={averageFeaturesData} />
    </div>
  );
}