import React from "react";
import Modal from "@/components/modal";
import CoverImage from "@/components/search/cover-image";
import MetadataInfo from "@/components/search/metadata-info";
import PreviewButton from "@/components/search/preview-button";
import { Track } from "@/lib/definitions";

export default function TrackModal({
  open,
  setOpen,
  buttons,
  result,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttons?: React.ReactNode;
  result: Track;
}) {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      buttons={buttons}
    >
      <h3 className="font-bold text-2xl px-2 pb-2 mb-4 border-b border-base-content/15">楽曲情報</h3>
      <div className="flex gap-4 px-2">
        <div className="flex-none w-1/3 max-w-[260px] flex flex-col gap-4">
          <CoverImage imageUrl={result.album.images[0].url} name={result.name} />
          <PreviewButton src={result.preview_url} />
        </div>
        <div className="grow w-2/3">
          <MetadataInfo
            type="track"
            title={result.name}
            artists={result.artists}
            albumName={result.album.name}
            albumId={result.album.id}
            releaseDate={result.album.release_date}
            spotifyUrl={result.external_urls.spotify}
            small={true} />
        </div>
      </div>
    </Modal>
  );
}
