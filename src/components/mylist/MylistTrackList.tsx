import { getSeveralTracksInfoData } from "@/lib/getter";
import TrackTable from "@/components/track-table";
import { MylistData } from "@/lib/definitions";

export default async function MylistTrackList({
  mylist,
}: {
  mylist: MylistData;
}) {
  const trackList = await getSeveralTracksInfoData(
    mylist.tracks.map(({ trackId }) => trackId).join()
  );

  if (!trackList) {
    return <p className="text-error">Error has occured...</p>;
  }

  return <TrackTable trackList={trackList} />;  
};
