import { getTrackInfoData } from "@/lib/getter";
import FeaturesInfo from "@/components/search/features-info";
import { convertTime, getKeyString } from "@/lib/utils";
import PreviewButton from "@/components/search/preview-button";
import MetadataInfo from "@/components/search/metadata-info";
import CoverImage from "@/components/search/cover-image";
import { notFound } from "next/navigation";

export default async function TrackInfoPage({
  params,
}: {
  params: { id: string; };
}) {
  const catalogData = await getTrackInfoData(params.id);

  // Error message
  if (!catalogData) {
    notFound();
  };

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
            <CoverImage imageUrl={catalogData.album.images[0].url} name={catalogData.name} />
            {/* <PreviewButton src={catalogData.preview_url} /> */}
          </div>
          <div className="grow w-2/3">
            <MetadataInfo
              type="track"
              title={catalogData.name}
              artists={catalogData.artists}
              albumName={catalogData.album.name}
              albumId={catalogData.album.id}
              releaseDate={catalogData.album.release_date}
              spotifyUrl={catalogData.external_urls.spotify} />
          </div>
        </div>
        {/* <FeaturesInfo info={infoList} features={featuresData} /> */}
      </div>
    </main>
  );
}
