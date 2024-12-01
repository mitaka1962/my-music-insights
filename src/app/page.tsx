import SharedMylists from "@/components/home/shared-mylists";
import SkeletonMylists from "@/components/home/skeleton-mylists";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="px-8 py-10 grid grid-cols-1 gap-8">
      <div className="grid grid-cols-1 gap-2 bg-base-200/70 p-8 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">MyMusic Insightsとは</h1>
        <p className="text-sm text-base-content/70">MyMusic Insightsは、お気に入りの楽曲をみんなと共有できるWebサイトです。自分好みの曲を集めたマイリストを作成して、みんなに公開してみましょう。</p>
        <p className="text-sm text-base-content/70">※このサイト上の全ての音楽情報は、<a href="https://developer.spotify.com/" target="_blank" className="link">Spotify Web API</a>から取得されています。</p>
        <Link href="/create/" className="btn btn-smlr mx-auto mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">マイリストを作成する</Link>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <h2 className="font-bold text-xl px-2 border-b border-base-content/15 pb-4">みんなのマイリスト</h2>
        <div className="px-2">
          <Suspense fallback={<SkeletonMylists />}>
            <SharedMylists />
          </Suspense>
        </div>        
      </div>
    </div>
  );
}
