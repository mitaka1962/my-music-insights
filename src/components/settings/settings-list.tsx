import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import ThemeDropdown from "./theme-dropdown";

export default function SettingsList() {
  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">テーマ</h2>
        <ThemeDropdown />
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">About</h2>
        <a className="btn btn-outline rounded-full" href="https://mitaka.boo.jp/" target="_blank">
          Blog
          <ArrowTopRightOnSquareIcon className="w-5" />
        </a>
      </div>
    </div>    
  );
}
