'use client'

import { useTheme } from "next-themes";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { translateThemeName } from "@/lib/utils";
import { useRef } from "react";

const themeList = ['system', 'light', 'dark'];

export default function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, item: string) => {
    setTheme(item);
    e.currentTarget.blur();
  };

  return (
    <div ref={ref} className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-smlr">
        {translateThemeName(theme)}
        <ChevronDownIcon className="w-5" />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 border border-base-content/15">
        {themeList.map((item) => (
          <li key={item}>
            <button
              className={clsx({ 'bg-base-content/10' : theme === item })}
              onClick={(e) => handleClick(e, item)}
            >
              {translateThemeName(item)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
