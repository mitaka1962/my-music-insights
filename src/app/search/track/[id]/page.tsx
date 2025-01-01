import { getMylist, getTrackInfoData } from "@/lib/getter";
import FeaturesInfo from "@/components/search/features-info";
import { convertTime, getKeyString } from "@/lib/utils";
import PreviewButton from "@/components/search/preview-button";
import MetadataInfo from "@/components/search/metadata-info";
import CoverImage from "@/components/search/cover-image";
import { notFound } from "next/navigation";

export default async function TrackInfoPage({
  params
}: {
  params: Promise<{ id: string; }>;
}) {
  const { id } = await params;
  const trackData = await getTrackInfoData(id);

  // Error message
  if (!trackData) {
    notFound();
  }

  // const infoList = [
  //   { name: 'Duration', value: convertTime(featuresData.duration_ms) },
  //   { name: 'Key', value: getKeyString(featuresData.key, featuresData?.mode) },
  //   { name: 'BPM', value: Math.round(featuresData.tempo) }
  // ];

  return (
    <main>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-none w-1/3 max-w-[260px] flex flex-col gap-4">
            <CoverImage imageUrl={trackData.album.images[0].url} name={trackData.name} />
            {/* <PreviewButton src={catalogData.preview_url} /> */}
          </div>
          <div className="grow w-2/3">
            <MetadataInfo
              type="track"
              title={trackData.name}
              artists={trackData.artists}
              albumName={trackData.album.name}
              albumId={trackData.album.id}
              releaseDate={trackData.album.release_date}
              spotifyUrl={trackData.external_urls.spotify} />
          </div>
        </div>
        {/* <FeaturesInfo info={infoList} features={featuresData} /> */}
      </div>
    </main>
  );
}
