import CoverImage from "@/components/search/cover-image";
import MetadataInfo from "@/components/search/metadata-info";
import { Track } from "@/lib/definitions";

export default function TrackModalContent({
  item,
}: {
  item: Track;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-none w-1/3 max-w-[260px] flex flex-col gap-4">
        <CoverImage imageUrl={item.album.images[0].url} name={item.name} />
        {/* <PreviewButton src={result.preview_url} /> */}
      </div>
      <div className="grow w-2/3">
        <MetadataInfo
          type="track"
          title={item.name}
          artists={item.artists}
          albumName={item.album.name}
          albumId={item.album.id}
          releaseDate={item.album.release_date}
          spotifyUrl={item.external_urls.spotify}
          small={true} />
      </div>
    </div>
  );
}
