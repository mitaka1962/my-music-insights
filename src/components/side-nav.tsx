'use client'

import { Cog6ToothIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: 'Home', href: '', icon: HomeIcon},
  { name: 'Search', href: 'search', icon: MagnifyingGlassIcon},
];

export default function SideNav() {
  const pathname = usePathname();
  const initialPath = pathname.split('/')[1];   // ex) '/search/track/[id]' => 'search'

  return (
    <div className="flex flex-col w-full h-full px-2 py-4 border-r">
      <div className="grow w-full flex flex-col gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={`/${link.href}`}
              className={clsx("btn btn-ghost btn-block no-animation justify-start gap-3 hover:-translate-y-0.5 hover:scale-105", {
                "bg-gray-200" : initialPath === link.href,
              })}>
              <Icon className="w-6" />
              <p>{link.name}</p>
            </Link>
          );
        })}
      </div>
      <Link 
        href="/settings"
        className={clsx("btn btn-ghost btn-block no-animation justify-start gap-3 hover:-translate-y-0.5 hover:scale-105", {
          "bg-gray-200" : initialPath === 'settings',
        })}>
        <Cog6ToothIcon className="w-6" />
        <p>Settings</p>
      </Link>
    </div>
  );
}
