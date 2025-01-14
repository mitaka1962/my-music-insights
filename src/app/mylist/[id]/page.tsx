import LoadingSpinner from "@/components/loading-spinner";
import MylistTrackList from "@/components/mylist/MylistTrackList";
import { fetchMylist } from "@/lib/data";
import { MylistData } from "@/lib/definitions";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function MylistPage({
  params,
}: {
  params: Promise<{ id: string; }>
}) {
  const { id } = await params;
  const mylist: MylistData | null = await fetchMylist(id);

  if (!mylist) {
    notFound();
  }

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
        <Suspense fallback={<LoadingSpinner />}>
          <MylistTrackList mylist={mylist} />
        </Suspense>        
      </main>
    </div>
  );
}
