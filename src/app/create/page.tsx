'use client';

import SideSearch from "@/components/side-search/side-search";
import { memo, useCallback, useReducer, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import SearchResultCardForCreate from "@/components/side-search/search-result-card-for-create";
import { Album, Track } from "@/lib/definitions";
import { useRouter } from "next-nprogress-bar";
import TrackListItemWithModal from "@/components/create/track-list-item-with-modal";
import Modal from "@/components/modal";
import ShareButton from "@/components/create/share-button";

const LIST_MAX = 10;

function reducer(state: Track[], action: { type: string, payload?: any }) {
  switch (action.type) {
    case 'add': {
      if (state.length >= LIST_MAX || !action.payload) {
        return state;
      }
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

const MemoSideSearch = memo(SideSearch);

export default function Page() {
  const router = useRouter();
  const [selectedTrackList, dispatch] = useReducer(reducer, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemove = (idx: number) => dispatch({ type: 'remove', payload: idx });

  const handleClearButtonClick = () => setIsModalOpen(true);

  const resultCard = useCallback((result: Track | Album) => (
    <SearchResultCardForCreate
      result={result as Track}
      handleAdd={(track: Track) => dispatch({ type: 'add', payload: track })} />
  ), [dispatch]);

  return (
    <div className="flex h-full">
      <div className="w-3/4 grid grid-rows-[auto_minmax(0,1fr)] px-8 py-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-4 border-b border-base-content/15 pb-4 items-center px-2">
          <h1 className="font-bold text-2xl">マイリストを新規作成</h1>
          <button
            className="btn btn-smlr"
            onClick={handleClearButtonClick}
            disabled={selectedTrackList.length === 0}
          >すべて削除</button>
          <Modal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            title="確認"
            buttons={<button className="btn btn-smlr btn-primary" onClick={() => dispatch({ type: 'clear' })}>はい</button>}
          >
            本当にすべて削除しますか？
          </Modal>
          <ShareButton />
        </div>
        <div className="grid grid-cols-1 auto-rows-min gap-2 px-2 overflow-y-auto py-4">
          {selectedTrackList.map((item, idx) => (
            <TrackListItemWithModal key={`${item.id}_${idx}`} item={item} idx={idx} handleRemove={handleRemove} />
          ))}
          {selectedTrackList.length < LIST_MAX ? (
            <div className="grid place-items-center border-dashed border-2 border-base-content/20 h-10 rounded-xl my-1">
              <PlusIcon className="w-6 text-base-content/30" />
            </div>
          ) : null}
        </div>
      </div>
      <div className="w-1/4 border-l border-base-content/15 overflow-y-scroll">
        <MemoSideSearch disableAlbum={true} card={resultCard} />
      </div>
    </div>
  );
}
