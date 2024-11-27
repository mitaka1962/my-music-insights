'use client';

import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function MylistCard({
  title,
  date,
  userName,
  userColor,
  imageUrls,
}: {
  title: string;
  date: Date;
  userName: string;
  userColor: string;
  imageUrls: string[];
}) {
  return (
    <div className="card card-bordered">
      <div className="card-body p-6">
        <h3 className="card-title">
          <Link href="/" className="link-hover overflow-hidden text-nowrap text-ellipsis">
            {title}
          </Link>          
        </h3>
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-1">
          <UserCircleIcon className="w-6 h-6" style={{ color: userColor }} />
          <span className="text-base-content/70 text-sm overflow-hidden text-nowrap text-ellipsis">{userName}</span>
        </div>
        <span className="text-base-content/70 text-sm text-end">作成日 : {date.toLocaleDateString('ja-JP')}</span>
      </div>
      <hr className="border-base-content/15 w-[95%] mx-auto" />
      <figure className="p-4 gap-2">
        {imageUrls.map((url, idx) => (
          <Image src={url} alt={`ジャケット画像${idx + 1}`} width={64} height={64} className="w-full h-full rounded" />
        ))}
      </figure>
    </div>
  );
}
