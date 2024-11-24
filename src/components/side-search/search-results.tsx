import { Album, SearchResult, CardRenderProp, SearchResultType, Track } from "@/lib/definitions";
import { Fragment } from "react";

export default function SearchResults({
  results,
  isLoading,
  error,
  type,
  card,
}: {
  results: SearchResult | undefined;
  isLoading: boolean;
  error: any;
  type: SearchResultType;
  card: CardRenderProp;
}) {
  // loading
  if (isLoading) {
    return (
      <div className="animate-fadein-up-20" >
        <ResultSkeleton />
        <ResultSkeleton />
        <ResultSkeleton />
      </div>
    );
  }

  // error
  if (error) {
    console.log(error.message);
    return <DisplayMessage msg={'Error has occurred! \u{1F62E}'} />;
  }

  // success (display all the results using render prop)
  const items = (type === 'track') ? results?.tracks.items : results?.albums.items;

  return (items?.length === 0) ? (
    <DisplayMessage msg={'No results found... \u{1F622}'} />
  ) : (
    <>
      {items?.map((item: Track | Album) => (
        <Fragment key={item.id}>
          {card(item)}
        </Fragment>
      ))}
    </>
  );
}

function DisplayMessage({ msg }: { msg: string }) {
  return (
    <div className="text-base-content/80 h-16 w-full flex items-center justify-center">
      {msg}
    </div>
  );  
}

function ResultSkeleton() {
  return (
    <div className="flex gap-3 py-2 px-2">
      <div className="skeleton w-[64px] h-[64px] rounded-md"></div>
      <div className="flex-auto min-w-0 h-[64px] flex flex-col py-1 gap-2">
        <div className="skeleton w-full h-4"></div>
        <div className="skeleton w-3/4 h-3"></div>
      </div>
    </div>
  );
}
