import TrackTable from "@/components/track-table";
import { getMylist, getSeveralTracksInfoData } from "@/lib/getter";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";

export default async function MylistPage({
  params,
}: {
  params: {
    id: string;
  }
}) {
  const mylist = await getMylist(params.id);

  if (!mylist) {
    notFound();
  }

  const trackList = await getSeveralTracksInfoData(mylist.tracks.map(({ trackId }) => trackId).join());
  
  return (
    <div className="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
      <main className="flex flex-col gap-6 px-6 py-8 min-h-full overflow-auto">
        <div className="card card-bordered">
          <div className="card-body gap-4">
            <h1 className="card-title text-2xl">{mylist.name}</h1>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-0.5">
              <UserCircleIcon className="w-6 h-6" style={{ color: mylist.user.imageColor }} />
              <span className="text-base-content/70 text-sm overflow-hidden text-nowrap text-ellipsis">{mylist.user.name}</span>
            </div>
            <span className="text-base-content/70 text-sm text-end">作成日 : {mylist.createdAt.toLocaleDateString('ja-JP')}</span>
          </div>
        </div>
        {trackList ? <TrackTable trackList={trackList} /> : <p className="text-error">Error has occured...</p>}
      </main>
    </div>
  );
}
