import { getAllMylists } from "@/lib/getter";
import MylistCard from "./mylist-card";
import { getTrackIdList } from "@/lib/utils";

export default async function SharedMylists() {
  const mylists = await getAllMylists();
  const trackIdList = getTrackIdList(mylists);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mylists.map((mylist) => (
        <MylistCard
          key={mylist.id}
          title={mylist.name}
          date={mylist.createdAt}
          userName={mylist.user.name}
          userColor={mylist.user.imageColor}
          imageUrls={new Array(3).fill('https://i.scdn.co/image/ab67616d0000485128933b808bfb4cbbd0385400')} />
      ))}
    </div>
  );
}
