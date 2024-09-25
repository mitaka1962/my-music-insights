import Image from "next/image";
import { getTrackInfoData, getTrackFeaturesData } from "@/lib/getter";
import FeaturesInfo from "@/components/search/features-info";
import { convertTime, getKeyString } from "@/lib/utils";
import SpotifyButton from "@/components/search/spotify-button";
import PreviewButton from "@/components/search/preview-button";

export default async function TrackInfo({
  id
}: {
  id: string;
}) {
  const catalogData = await getTrackInfoData(id);
  const featuresData = await getTrackFeaturesData(id);

  const infoList = [
    { name: 'Duration', value: convertTime(featuresData.duration_ms) },
    { name: 'Key', value: getKeyString(featuresData.key, featuresData.mode) },
    { name: 'BPM', value: Math.round(featuresData.tempo) }
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex-none w-1/3 max-w-[260px] flex flex-col gap-4">
          <Image
            className="shadow-md rounded-sm md:rounded"
            src={catalogData.album.images[0].url}
            alt={`${catalogData.name}のカバー画像`}
            width={260}
            height={260} />
          <PreviewButton src={catalogData.preview_url} />
        </div>
        <div className="grow w-2/3 card card-bordered bg-base-100">
          <div className="card-body gap-4">
            <div className="flex flex-col gap-3">
              <span className="w-fit px-3 py-0.5 bg-gray-100 rounded-md font-medium text-sm">Track</span>
              <h1 className="card-title text-4xl font-extrabold">{catalogData.name}</h1>
            </div>            
            <div className="grow flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="badge badge-outline flex-none mt-0.5">Artist</div>
                <div className="grow">{catalogData.artists.map((artist: { name: string; }) => artist.name).join(', ')}</div>
              </div>
              <div className="flex gap-2">
                <div className="badge badge-outline flex-none mt-0.5">Album</div>
                <div className="grow">{catalogData.album.name}</div>
              </div>
              <div className="flex gap-2">
                <div className="badge badge-outline flex-none mt-0.5">Release</div>
                <div className="grow">{catalogData.album.release_date}</div>
              </div>                          
            </div>
            <div className="flex justify-end">
              <SpotifyButton href={catalogData.external_urls.spotify} />
            </div> 
          </div>
        </div>
      </div>
      <FeaturesInfo info={infoList} features={featuresData} />
    </div>
  );
}