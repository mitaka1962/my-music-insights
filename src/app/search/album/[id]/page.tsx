import { getAlbumInfoData, getSeveralTracksFeaturesData } from "@/lib/getter";
import FeaturesInfo from "@/components/search/features-info";
import { calculateAverageFeature, calculateSumFeature, convertTime, getAverageFeaturesData } from "@/lib/utils";
import MetadataInfo from "@/components/search/metadata-info";
import CoverImage from "@/components/search/cover-image";

export default async function AlbumInfoPage({
  params,
}: {
  params: {
    id: string;
  }
}) {
  const catalogData = await getAlbumInfoData(params.id);
  const trackIds = catalogData.tracks.items.map((item: {id: string}) => item.id).join(',')
  const { audio_features } = await getSeveralTracksFeaturesData(trackIds);

  const infoList = [
    { name: 'Total Duration', value: convertTime(calculateSumFeature(audio_features, 'duration_ms')) },
    { name: 'Average BPM', value: Math.round(calculateAverageFeature(audio_features, 'tempo')) }
  ];

  const averageFeaturesData = getAverageFeaturesData(audio_features);

  return (
    <main>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-none w-1/3 max-w-[260px]">
            <CoverImage imageUrl={catalogData.images[0].url} name={catalogData.name} />
          </div>
          <div className="grow w-2/3">
            <MetadataInfo
              type={catalogData.album_type}
              title={catalogData.name}
              artists={catalogData.artists}
              releaseDate={catalogData.release_date}
              spotifyUrl={catalogData.external_urls.spotify} />
          </div>
        </div>
        <FeaturesInfo info={infoList} features={averageFeaturesData} />
      </div>
    </main>
  );
}
