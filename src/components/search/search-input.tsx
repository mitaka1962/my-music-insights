import { MagnifyingGlassIcon, Square2StackIcon, UsersIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function SearchInput({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  const searchKeyword = useRef<HTMLInputElement>(null);
  const artistKeyword = useRef<HTMLInputElement>(null);
  const albumKeyword = useRef<HTMLInputElement>(null);
  
  const searchBoxList = [
    { label: '', icon: null, placeholder: 'Search tracks...', queryKey: 'q', ref: searchKeyword},
    { label: 'Artist', icon: UsersIcon, placeholder: 'Artist name', queryKey: 'artist', ref: artistKeyword},
    { label: 'Album', icon: Square2StackIcon, placeholder: 'Album name', queryKey: 'album', ref: albumKeyword},
  ];

  // Search button's click event handler
  const handleSearch = () => {
    const query = searchKeyword.current?.value.trim();
    const artist = artistKeyword.current?.value.trim();
    const album = albumKeyword.current?.value.trim();

    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (artist) params.append('artist', artist);
    if (album) params.append('album', album);

    router.push(`${pathname}?${params}`);
  }

  return (
    <div className="flex flex-col px-2 py-4">
      {searchBoxList.map(
        (item) => {
          const Icon = item.icon;
          return (
            <label key={item.queryKey} className="form-control w-full">
              {item.label ? (
                <div className="label pt-2.5 pb-1 justify-start gap-1">
                  {Icon ? <Icon className="w-4 text-gray-600" /> : null}
                  <span className="label-text text-gray-600">{item.label}</span>
                </div>
              ) : null}
              <input
                type="text"
                placeholder={item.placeholder}
                className="input input-bordered input-sm w-full"
                defaultValue={searchParams.get(item.queryKey) ?? ''} 
                ref={item.ref} />
            </label>
          )
        }
      )}
      <div className="mt-6">
        <button className="btn btn-sm w-full h-9 gap-1" onClick={handleSearch}>
          <MagnifyingGlassIcon className="w-4" />
          Search
        </button>
      </div>
    </div>
  );
}
