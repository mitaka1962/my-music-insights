import SharedMylists from "@/components/home/shared-mylists";
import Link from "next/link";

export default function Page() {
  return (
    <div className="px-6 py-8 grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-2xl font-bold">MyMusic Insightsとは</h1>
        <div>サイトの説明がここに入ります。</div>
        <Link href="/create/" className="btn btn-primary mx-auto">マイリストを作成する</Link>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <h2 className="font-bold text-xl px-2 border-b border-base-content/15 pb-4">みんなのマイリスト</h2>
        <div className="px-2">
          <SharedMylists />
        </div>        
      </div>
    </div>
  );
}
