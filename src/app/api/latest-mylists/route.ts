import { fetchLatestMylists } from '@/lib/data';
import { MylistCardData } from '@/lib/definitions';
import { getSeveralTracksImageUrls } from '@/lib/getter';
import { type NextRequest } from 'next/server'

const DEFAULT_LIMIT = 12;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Number(searchParams.get('limit') ?? DEFAULT_LIMIT);
  const cursor = searchParams.get('cursor') ?? undefined;

  try {
    const mylistsPlusOne = await fetchLatestMylists(limit + 1, cursor);
    const mylists: MylistCardData[] = mylistsPlusOne.slice(0, limit);
    const hasNext = mylistsPlusOne.length > limit;

    // fetch the track images from Spotify Web API (max 50 ids per request)
    const trackIdsList = mylists.map((mylist) => (
      mylist.tracks.map((track) => track.trackId)
    )).flat();
    
    const imageUrls: string[] = [];
    const promises = [];  // for parallel requests
    for (let i = 0; i * 50 < trackIdsList.length; i++) {
      promises.push(getSeveralTracksImageUrls(
        trackIdsList.slice(i * 50, (i + 1) * 50).join(',')
      ));
    }
    const results = await Promise.all(promises);
    results.forEach(urls => imageUrls.push(...urls));

    mylists.forEach((mylist, idx) => {
      mylist.imageUrls = imageUrls.slice(idx * 3, (idx + 1) * 3);
    });
    
    return Response.json({
      mylists: mylists,
      cursor: hasNext ? mylists[mylists.length - 1].id : null,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      error,
    }, {
      status: 500,
    });
  }
}
