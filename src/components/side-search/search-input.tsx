import { SpotifySearchParams } from "@/lib/definitions";
import { MagnifyingGlassIcon, Square2StackIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useRef } from "react";

export default function SearchInput({
  spotifySearchParams,
  setSpotifySearchParams,
}: {
  spotifySearchParams: SpotifySearchParams;
  setSpotifySearchParams: Dispatch<SetStateAction<SpotifySearchParams>>;
}) {  
  const searchKeyword = useRef<HTMLInputElement>(null);
  const artistKeyword = useRef<HTMLInputElement>(null);
  const albumKeyword = useRef<HTMLInputElement>(null);
  
  const searchBoxList = [
    { label: '', icon: null, placeholder: 'Search tracks...', value: spotifySearchParams?.['q'], ref: searchKeyword},
    { label: 'Artist', icon: UsersIcon, placeholder: 'Artist name', value: spotifySearchParams?.['artist'], ref: artistKeyword},
    { label: 'Album', icon: Square2StackIcon, placeholder: 'Album name', value: spotifySearchParams?.['album'], ref: albumKeyword},
  ];

  // Search button's click event handler
  const handleSearch = () => {
    const query = searchKeyword.current?.value.trim();
    const artist = artistKeyword.current?.value.trim();
    const album = albumKeyword.current?.value.trim();

    const params: SpotifySearchParams = {};
    if (query) params['q'] = query;
    if (artist) params['artist'] = artist;
    if (album) params['album'] = album;

    setSpotifySearchParams(params);
  }

  return (
    <div className="flex flex-col px-2 py-4">
      {searchBoxList.map(
        (item) => {
          const Icon = item.icon;
          return (
            <label key={item.label} className="form-control w-full">
              {item.label ? (
                <div className="label pt-2.5 pb-1 justify-start gap-1 text-base-content/70">
                  {Icon ? <Icon className="w-4" /> : null}
                  <span className="label-text text-inherit">{item.label}</span>
                </div>
              ) : null}
              <input
                type="text"
                placeholder={item.placeholder}
                className="input input-bordered input-sm w-full dark:placeholder:opacity-30"
                defaultValue={item.value ?? ''} 
                ref={item.ref} />
            </label>
          )
        }
      )}
      <div className="mt-4">
        <button className="btn btn-smlr btn-block gap-1" onClick={handleSearch}>
          <MagnifyingGlassIcon className="w-4" />
          Search
        </button>
      </div>
    </div>
  );
}
