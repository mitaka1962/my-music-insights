'use client';

import SideSearch from "@/components/side-search/side-search";
import { useReducer, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import SearchResultCardForCreate from "@/components/side-search/search-result-card-for-create";
import { Album, Track } from "@/lib/definitions";
import TrackListItemWithModal from "@/components/create/track-list-item-with-modal";
import Modal from "@/components/modal/modal";
import CreateMylistForm from "@/components/create/create-mylist-form";
import ModalActions from "@/components/modal/modal-actions";

const TRACK_LIST_MAX = 10;

function reducer(state: Track[], action: { type: string, payload?: any }) {
  switch (action.type) {
    case 'add': {
      return [...state, action.payload];
    }
    case 'remove': {
      return state.filter((_, idx) => idx !== action.payload);
    }
    case 'clear': {
      return [];
    }
  }
  
  throw Error('Unknown action: ' + action.type);
}

export default function Page() {
  const [selectedTrackList, dispatch] = useReducer(reducer, []);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const isEmpty = selectedTrackList.length === 0;

  const handleAdd = (track: Track) => {
    if (selectedTrackList.length >= TRACK_LIST_MAX) {
      alert(`追加できるトラックは最大${TRACK_LIST_MAX}枚です。`);
      return;
    }

    if (selectedTrackList.some((item) => item.id === track.id)) {
      alert('既に追加済みのトラックです。');
      return;
    }

    dispatch({ type: 'add', payload: track });
  }

  const handleRemove = (idx: number) => dispatch({ type: 'remove', payload: idx });

  const handleClearButtonClick = () => setIsClearModalOpen(true);

  const handleShareButtonClick = () => {
    if (selectedTrackList.length < 3) {
      alert('トラックは最低3つ必要です。');
    } else {
      setIsShareModalOpen(true);
    }
  };

  // render props for SideSearch component
  const resultCard = (result: Track | Album) => (
    <SearchResultCardForCreate
      result={result as Track}
      handleAdd={handleAdd} />
  );

  return (
    <div className="flex h-full">
      <div className="w-3/4 grid grid-rows-[auto_minmax(0,1fr)] px-8 py-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-4 border-b border-base-content/15 pb-4 items-center px-2">
          <h1 className="font-bold text-2xl">マイリストを新規作成</h1>
          <button className="btn btn-smlr" onClick={handleClearButtonClick} disabled={isEmpty}>すべて削除</button>
          <Modal
            open={isClearModalOpen}
            setOpen={setIsClearModalOpen}
            title="確認"
          >
            本当にすべて削除しますか？
            <ModalActions>
              <button className="btn btn-smlr btn-primary" onClick={() => dispatch({ type: 'clear' })}>削除する</button>
            </ModalActions>
          </Modal>
          <button className="btn btn-smlr btn-primary" onClick={handleShareButtonClick}>公開する</button>
          <Modal
            open={isShareModalOpen}
            setOpen={setIsShareModalOpen}
            title="名前を付けて公開"
          >
            <CreateMylistForm selectedTrackList={selectedTrackList} />
          </Modal>
        </div>
        <div className="grid grid-cols-1 auto-rows-min gap-2 px-2 overflow-y-auto py-4">
          {selectedTrackList.map((item, idx) => (
            <TrackListItemWithModal key={item.id} item={item} idx={idx} handleRemove={handleRemove} />
          ))}
          {selectedTrackList.length < TRACK_LIST_MAX ? (
            <div className="grid place-items-center border-dashed border-2 border-base-content/20 h-10 rounded-xl my-1">
              <PlusIcon className="w-6 text-base-content/30" />
            </div>
          ) : null}
        </div>
      </div>
      <div className="w-1/4 border-l border-base-content/15 overflow-y-scroll">
        <SideSearch disableAlbum={true} card={resultCard} />
      </div>
    </div>
  );
}
