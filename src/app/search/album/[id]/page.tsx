import { getAlbumInfoData } from "@/lib/getter";
import FeaturesInfo from "@/components/search/features-info";
import {convertTime } from "@/lib/utils";
import MetadataInfo from "@/components/search/metadata-info";
import CoverImage from "@/components/search/cover-image";
import { notFound } from "next/navigation";
import TrackTable from "@/components/track-table";

export default async function AlbumInfoPage({
  params,
}: {
  params: Promise<{ id: string; }>
}) {
  const { id } = await params;
  const albumData = await getAlbumInfoData(id);
  // const trackIds = catalogData?.tracks.items.map((item: {id: string}) => item.id).join(',')
  // const tracksFeatures = await getSeveralTracksFeaturesData(trackIds ?? '');

  // Error message
  if (!albumData) {
    notFound();
  }

  // insert album images
  const albumTrackList = albumData.tracks.items.map((track) => ({...track, album: albumData }));

  // const infoList = [
  //   { name: 'Total Duration', value: convertTime(calculateSumFeature(tracksFeatures.audio_features, 'duration_ms')) },
  //   { name: 'Average BPM', value: Math.round(calculateAverageFeature(tracksFeatures.audio_features, 'tempo')) }
  // ];

  // const averageFeaturesData = getAverageFeaturesData(tracksFeatures.audio_features);

  return (
    <main>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
          <div className="flex-none w-1/3 max-w-[260px]">
            <CoverImage imageUrl={albumData.images[0].url} name={albumData.name} />
          </div>
          <div className="grow w-2/3">
            <MetadataInfo
              type={albumData.album_type}
              title={albumData.name}
              artists={albumData.artists}
              releaseDate={albumData.release_date}
              spotifyUrl={albumData.external_urls.spotify} />
          </div>
        </div>
        {/* <FeaturesInfo info={infoList} features={averageFeaturesData} /> */}
        <TrackTable trackList={albumTrackList} />
      </div>
    </main>
  );
}
