'use client';

import { Track } from "@/lib/definitions";
import SearchResultCard from "./search-result-card";
import CoverImage from "@/components/search/cover-image";
import MetadataInfo from "@/components/search/metadata-info";
import PreviewButton from "@/components/search/preview-button";
import { useState } from "react";
import Modal from "../modal";
import TrackModal from "../track-modal";

export default function SearchResultCardForCreate({
  result,
  handleAdd,
}: {
  result: Track;
  handleAdd: (track: Track) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="text-left" onClick={() => setIsOpen(true)}>
        <SearchResultCard result={result} />
      </button>
      {/* --modal-- */}
      <TrackModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        buttons={<>
          <button className="btn">キャンセル</button>
          <button className="btn btn-primary" onClick={() => handleAdd(result)}>追加する</button>
        </>}
        result={result}
      />
    </>
  );
}
