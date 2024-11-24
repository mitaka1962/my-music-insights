'use client'

import { 
  HomeIcon as SolidHomeIcon, 
  MagnifyingGlassIcon as SolidMagnifyingGlassIcon, 
  PlusCircleIcon as SolidPlusCircleIcon, 
  Cog6ToothIcon as SolidCog6ToothIcon,
} from "@heroicons/react/24/solid";
import { 
  HomeIcon as OutlineHomeIcon, 
  MagnifyingGlassIcon as OutlineMagnifyingGlassIcon, 
  PlusCircleIcon as OutlinePlusCircleIcon,
  Cog6ToothIcon as OutlineCog6ToothIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: 'Home', href: '', outlineIcon: OutlineHomeIcon, solidIcon: SolidHomeIcon },
  { name: 'Search', href: 'search', outlineIcon: OutlineMagnifyingGlassIcon, solidIcon: SolidMagnifyingGlassIcon },
  { name: 'Create', href: 'create', outlineIcon: OutlinePlusCircleIcon, solidIcon: SolidPlusCircleIcon },
];

export default function SideNav() {
  const pathname = usePathname();
  const initialPath = pathname.split('/')[1];   // ex) '/search/track/[id]' => 'search'

  const isCurrentPath = (routeName: string) => {
    return initialPath === routeName;
  };

  return (
    <div className="flex flex-col w-full h-full px-2 py-4 border-r border-base-content/15">
      <div className="flex-none px-4 mt-6 mb-8 rounded-xl">
        <span className="text-xl font-bold">MyMusic Insights</span>
      </div>
      <div className="grow w-full flex flex-col gap-2">
        {links.map((link) => {
          const OutlineIcon = link.outlineIcon
          const SolidIcon = link.solidIcon;

          return (
            <Link 
              key={link.name} 
              href={`/${link.href}`}
              className={clsx("btn btn-ghost btn-block no-animation justify-start gap-3 active:opacity-60", {
                "bg-base-content/10" : isCurrentPath(link.href),
              })}>
              {isCurrentPath(link.href) ? <SolidIcon className="w-6" /> : <OutlineIcon className="w-6" />}
              <p>{link.name}</p>
            </Link>
          );
        })}
      </div>
      <Link 
        href="/settings"
        className={clsx("btn btn-ghost btn-block no-animation justify-start gap-3 active:opacity-60", {
          "bg-base-content/10" : isCurrentPath('settings'),
        })}>
        {isCurrentPath('settings') ? <SolidCog6ToothIcon className="w-6" /> : <OutlineCog6ToothIcon className="w-6" />}
        <p>Settings</p>
      </Link>
    </div>
  );
}
