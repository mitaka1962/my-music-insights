import { useState } from "react";
import TrackListItem from "@/components/create/track-list-item";
import { Track } from "@/lib/definitions";
import TrackModal from "@/components/track-modal";

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

  const handleClick = () => setIsOpen(true);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // prevent scroll by Space key
      handleClick();
    }
  };

  return (
    <>
      <div role="button" tabIndex={0} className="" onClick={handleClick} onKeyDown={handleKeyDown}>
        <TrackListItem item={item} idx={idx} handleRemove={handleRemove} />
      </div>
      {/* --modal-- */}
      <TrackModal
        open={isOpen}
        setOpen={setIsOpen}
        buttons={<button className="btn btn-primary" onClick={() => handleRemove(idx)}>削除する</button>}
        result={item}
      />
    </>
  );
}
