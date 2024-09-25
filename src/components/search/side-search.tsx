'use client'

import { useRef, useState } from "react";
import clsx from "clsx";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Album, SearchResult, SearchResultType, Track } from "@/lib/definitions";
import { MagnifyingGlassIcon, Square2StackIcon, UsersIcon } from "@heroicons/react/24/outline";


const fetcher = async (params: { q?: string; artist?: string; album?: string; }) => { 
  const queryArray = [
    params.q,
    params.artist && `artist:${params.artist}`,
    params.album && `album:${params.album}`,
  ];
  const query = queryArray.filter(Boolean).join(' ');
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);  
  const results = await response.json();
  return results;
};

export default function SideSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Type of displayed search results: track or album
  const [type, setType] = useState<SearchResultType>('track');

  const searchKeyword = useRef<HTMLInputElement>(null);
  const artistKeyword = useRef<HTMLInputElement>(null);
  const albumKeyword = useRef<HTMLInputElement>(null);
  
  // Fetch data from the Spotify API's search endpoint
  const {data, error, isLoading} = useSWR(
    (searchParams.has('q') || searchParams.has('artist') || searchParams.has('album'))
      ? Object.fromEntries(searchParams.entries()) : null,
    fetcher
  );

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
    <div className="flex flex-col px-1.5 h-full divide-y">
      <div className="flex-none flex flex-col px-2 py-4">
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
      <div className="flex flex-col grow">
        <div className="flex-none flex gap-2 px-2 pt-4">
          <button
            className={clsx("btn btn-sm rounded-full", {"btn-neutral" : type === 'track'})}
            onClick={() => setType('track')}>トラック</button>
          <button 
            className={clsx("btn btn-sm rounded-full", {"btn-neutral" : type === 'album'})}
            onClick={() => setType('album')}>アルバム</button>
        </div>
        <div className="grow flex flex-col py-4">
          <SearchResults
            results={data}
            isLoading={isLoading}
            error={error}
            type={type}
            params={searchParams} />
        </div>
      </div>      
    </div>
  );
}

function SearchResults({
  results,
  isLoading,
  error,
  type,
  params,
}: {
  results: SearchResult;
  isLoading: boolean;
  error: any;
  type: SearchResultType;
  params: URLSearchParams;
}) {
  const displayMessage = (msg: string) => (
    <div className="text-gray-600 h-16 w-full flex items-center justify-center">
      {msg}
    </div>
  );
  const resultSkeleton = (
    <div className="flex gap-3 py-2 px-2">
      <div className="skeleton w-[64px] h-[64px] rounded-md"></div>
      <div className="flex-auto min-w-0 h-[64px] flex flex-col py-1 gap-2">
        <div className="skeleton w-full h-4"></div>
        <div className="skeleton w-3/4 h-3"></div>
      </div>
    </div>
  );

  if (isLoading) return (
    // <div className="grow flex w-full justify-center items-center">
    //   <span className="loading loading-spinner loading-lg text-gray-500"></span>
    // </div>  
    <div className="animate-skeleton-fadein" >
      {resultSkeleton}
      {resultSkeleton}
      {resultSkeleton}
    </div>
  );

  if (error) {
    console.log(error.message);
    return displayMessage('Error has occurred! \u{1F62E}');
  }

  if (type === 'track') {
    return (results?.tracks.items.length === 0) ? (
      displayMessage('No results found... \u{1F622}')
    ) : (
      <>
        {results?.tracks.items.map(
          (item: Track) => (
            <SearchResultCard 
              key={item.id}
              type={type}
              id={item.id}
              params={params}
              image_url={item.album.images[item.album.images.length - 1].url}
              name={item.name}
              artist_name={item.artists[0].name} />
          )
        )}
      </>
    );
  }
  if (type === 'album') {
    return (results?.albums.items.length === 0) ? (
      displayMessage('No results found... \u{1F622}')
    ) : (
      <>
        {results?.albums.items.map(
          (item: Album) => (
            <SearchResultCard
              key={item.id}
              type={type}
              id={item.id}
              params={params}
              image_url={item.images[item.images.length - 1].url}
              name={item.name}
              artist_name={item.artists[0].name} />
          )
        )}
      </>
    );
  }
}

function SearchResultCard({
  id,
  type,
  params,
  image_url,
  name,
  artist_name,
}: {
  id: string;
  type: SearchResultType;
  params: URLSearchParams;
  image_url: string;
  name: string;
  artist_name: string;
}) {
  return (
    <Link href={`/search/${type}/${id}?${params}`}>
      <div className="flex gap-3 py-2 px-2 rounded hover:bg-gray-200 hover:opacity-80">
        <div className="flex-none h-[64px] overflow-hidden aspect-square rounded-sm border">
          <Image
            src={image_url}
            alt={`${name}のジャケット画像`}
            width={64}
            height={64} />
        </div>              
        <div className="flex-auto min-w-0 h-[64px] flex flex-col py-1">
          <div className="font-medium truncate">{name}</div>
          <div className="text-gray-600 text-sm truncate">{artist_name}</div>
        </div>
      </div>    
    </Link>
  );
}
