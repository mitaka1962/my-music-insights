import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function MylistCard({
  id,
  title,
  date,
  userName,
  userColor,
  imageUrls = [null, null, null],
}: {
  id: string;
  title: string;
  date: Date;
  userName: string;
  userColor: string;
  imageUrls?: Array<string | null>;
}) {
  return (
    <div className="card card-bordered border-base-content/10">
      <div className="card-body p-6 pb-4">
        <h3 className="card-title text-lg">
          <Link href={`/mylist/${id}`} className="link-hover overflow-hidden text-nowrap text-ellipsis">
            {title}
          </Link>          
        </h3>
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-0.5">
          <UserCircleIcon className="w-6 h-6" style={{ color: userColor }} />
          <span className="text-base-content/70 text-sm overflow-hidden text-nowrap text-ellipsis">{userName}</span>
        </div>
        <span className="text-base-content/70 text-sm text-end">作成日 : {date.toLocaleDateString('ja-JP')}</span>
      </div>
      <figure>
        <div className="w-full grid grid-cols-3">
          {imageUrls.map((url, idx) => (
            url ? (
              <Image
                key={url + idx}
                src={url}
                alt={`ジャケット画像${idx + 1}`}
                width={300}
                height={300}
                className="w-full aspect-square object-cover"
                unoptimized />
            ) : (
              <div key={idx} className="w-full aspect-square bg-slate-500">No Image</div>
            )
          ))}
        </div>        
      </figure>
    </div>
  );
}
