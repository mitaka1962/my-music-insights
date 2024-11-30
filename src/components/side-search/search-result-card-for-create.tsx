'use client';

import { Track } from "@/lib/definitions";
import SearchResultCard from "./search-result-card";
import { useState } from "react";
import Modal from "../modal/modal";
import ModalActions from "@/components/modal/modal-actions";
import TrackModalContent from "../modal/track-modal-content";

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
      <Modal
        open={isOpen}
        setOpen={setIsOpen}
        title="楽曲情報"
      >
        <TrackModalContent item={result} />
        <ModalActions>
          <button className="btn btn-smlr btn-primary" onClick={() => handleAdd(result)}>追加する</button>
        </ModalActions>
      </Modal>
    </>
  );
}
