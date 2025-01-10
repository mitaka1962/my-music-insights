import { getSpotifyData } from '@/lib/getter';
import { type NextRequest } from 'next/server'

/* APIs for fetching data from client components */

const LIMIT = 50;
export async function GET(request: NextRequest) {  
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('q');
  const artist = searchParams.get('artist');
  const album = searchParams.get('album');
  const type = searchParams.get('type');
  const page = Number(searchParams.get('page'));

  const queryArray = [];
  if (q) queryArray.push(q);
  if (artist) queryArray.push(`artist:${artist}`);
  if (album) queryArray.push(`album:${album}`);
  const query = queryArray.join(' ');

  try {
    const results = await getSpotifyData(
      `/search?q=${encodeURIComponent(query)}&type=${type}&limit=${LIMIT}&offset=${page * LIMIT}&market=JP`
    );
    return Response.json(results);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({
        status: 500,
        message: error.message,
      }, {
        status: 500,
      });
    }
  }
}
