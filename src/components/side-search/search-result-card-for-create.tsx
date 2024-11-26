'use client';

import { Track } from "@/lib/definitions";
import SearchResultCard from "./search-result-card";
import { useState } from "react";
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
        setOpen={setIsOpen}
        buttons={<button className="btn btn-primary" onClick={() => handleAdd(result)}>追加する</button>}
        result={result}
      />
    </>
  );
}
