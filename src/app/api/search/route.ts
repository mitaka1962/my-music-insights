import { getSpotifyData } from '@/lib/getter';
import { type NextRequest } from 'next/server'

/* APIs for fetching data from client components */
const PAGE_SIZE = 50;
export async function GET(request: NextRequest) {  
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q');
  const artist = searchParams.get('artist');
  const album = searchParams.get('album');
  const type = searchParams.get('type');
  const page = Number(searchParams.get('page'));

  const queryArray = [
    q,
    artist && `artist:${artist}`,
    album && `album:${album}`,
  ];
  const query = queryArray.filter(Boolean).join(' ');

  const results = await getSpotifyData(
    `/search?q=${encodeURIComponent(query)}&type=${type}&limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}&market=JP`
  );
  return Response.json(results);
}
