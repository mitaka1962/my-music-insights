import { getSeveralTracksFeaturesData, getSeveralTracksInfoData } from "@/lib/getter";
import { convertTime, calculateAverageFeature, getAverageFeaturesData } from "@/lib/utils";
import FeaturesInfo from "@/components/search/features-info";
import { Track } from "@/lib/definitions";
import TrackListItem from "@/components/create/track-list-item";
import ShareButton from "@/components/create/share-button";

export default async function AnalysisInfoPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const catalogDataList = await getSeveralTracksInfoData(searchParams.q);
  const tracksFeatures = await getSeveralTracksFeaturesData(searchParams.q);

  // Error message
  if (!catalogDataList || !tracksFeatures) {
    return 'Failed to fetch data from Spotify Web API';
  };

  const infoList = [
    { name: 'Average Duration', value: convertTime(calculateAverageFeature(tracksFeatures.audio_features, 'duration_ms')) },
    { name: 'Average BPM', value: Math.round(calculateAverageFeature(tracksFeatures.audio_features, 'tempo')) }
  ];

  const averageFeaturesData = getAverageFeaturesData(tracksFeatures.audio_features);

  return (
    <main className="h-full px-8 py-10 overflow-y-auto">
      <div className="w-3/4 grid grid-cols-1 gap-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-2 border-b border-base-content/15 pb-4">
          <h1 className="font-bold text-2xl h-12 content-center">分析結果</h1>
          <ShareButton />
        </div>        
        <div className="px-2">
          <FeaturesInfo info={infoList} features={averageFeaturesData} />
        </div>        
        <div className="grid grid-cols-1 auto-rows-min gap-3 px-2">
          {catalogDataList?.tracks.map((item: Track, idx: number) => (
            <TrackListItem key={`${item.id}_${idx}`} item={item} idx={idx} />
          ))}
        </div> 
      </div>
    </main>    
  );
}
