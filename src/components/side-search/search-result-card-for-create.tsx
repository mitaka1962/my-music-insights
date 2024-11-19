'use client';

import { Track } from "@/lib/definitions";
import SearchResultCard from "./search-result-card";
import CoverImage from "@/components/search/cover-image";
import MetadataInfo from "@/components/search/metadata-info";
import PreviewButton from "@/components/search/preview-button";
import { useRef } from "react";

export default function SearchResultCardForCreate({
  result,
  handleAdd,
}: {
  result: Track;
  handleAdd: (track: Track) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button className="text-left" onClick={() => dialogRef.current?.showModal()}>
        <SearchResultCard result={result} />
      </button>
      {/* --modal-- */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box min-w-[50%] max-w-[80%] w-fit">
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
                artists={result.artists.slice(0, 1)}
                albumName={result.album.name}
                albumId={result.album.id}
                releaseDate={result.album.release_date}
                spotifyUrl={result.external_urls.spotify} />
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button className="btn">キャンセル</button>
              <button className="btn btn-primary" onClick={() => handleAdd(result)}>追加する</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
