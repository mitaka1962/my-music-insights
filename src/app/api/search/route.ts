import { getSpotifyData } from '@/lib/getter';
import { type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const results = await getSpotifyData(`/search?q=${query}&type=track,album&limit=50&market=JP`);  
  return Response.json(results);
}
