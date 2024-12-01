import SharedMylists from "@/components/home/shared-mylists";
import SkeletonMylists from "@/components/home/skeleton-mylists";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="px-8 py-10 grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold">MyMusic Insightsとは</h1>
        <div>サイトの説明がここに入ります。</div>
        <Link href="/create/" className="btn btn-smlr btn-neutral mx-auto">マイリストを作成する</Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
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
