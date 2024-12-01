import { getBatchMylists, getSeveralTracksImageUrls } from "@/lib/getter";
import MylistCard from "@/components/home/mylist-card";
import { MylistCardData } from "@/lib/definitions";

const getTrackIdsList = (data: MylistCardData[]): string[][] => {
  return data.map((mylist) => (
    mylist.tracks.map(({ trackId }) => trackId)
  ));
}

export default async function SharedMylists() {
  const mylists = await getBatchMylists();
  const trackIdsList = getTrackIdsList(mylists);  
  const imageUrls = await getSeveralTracksImageUrls(trackIdsList.join());  

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mylists.map((mylist, idx) => (
        <MylistCard
          key={mylist.id}
          id={mylist.id}
          title={mylist.name}
          date={mylist.createdAt}
          userName={mylist.user.name}
          userColor={mylist.user.imageColor}
          imageUrls={imageUrls?.slice(3 * idx, 3 * (idx + 1))} />
      ))}
    </div>
  );
}
