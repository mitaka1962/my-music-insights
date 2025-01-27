import { useCallback, useState } from "react";
import TrackListItem from "@/components/create/track-list-item";
import { Track } from "@/lib/definitions";
import Modal from "@/components/modal/modal";
import ModalActions from "@/components/modal/modal-actions";
import TrackModalContent from "../modal/track-modal-content";

export default function TrackListItemWithModal({
  item,
  idx,
  handleRemove,
}: {
  item: Track;
  idx: number;
  handleRemove: (idx: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollIntoViewCallback = useCallback((node: HTMLDivElement | null) =>{
    node?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // prevent scroll by Space key
      setIsOpen(true);
    }
  };

  return (
    <>
      <div
        ref={scrollIntoViewCallback}
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
      >
        <TrackListItem
          item={item}
          idx={idx}
          handleRemove={handleRemove} />
      </div>
      <Modal
        open={isOpen}
        setOpen={setIsOpen}
        title="楽曲情報"
      >
        <TrackModalContent item={item} />
        <ModalActions>
          <button
            className="btn btn-smlr btn-neutral"
            onClick={() => handleRemove(idx)}>削除する</button>
        </ModalActions>
      </Modal>
    </>
  );
}
