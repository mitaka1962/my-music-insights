import { Album, MylistCardData, Track } from "@/lib/definitions";
import prisma from "@/lib/prisma";

export async function getSpotifyData(endpoint: string) {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
    
  // get an access token (expired in 3600s)
  const accessTokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });

  if (!accessTokenResponse.ok) {
    const info = await accessTokenResponse.json();
    throw new Error(`Spotify Web API Error (${info.error})`);
  }

  const accessTokenData = await accessTokenResponse.json();
  
  // send a request for Spotify Web API
  const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: {
      'Authorization': 'Bearer ' + accessTokenData.access_token,
      'Accept-Language': 'ja',
    }
  });

  if (!response.ok) {
    const info = await response.json();
    throw new Error(`Spotify Web API Error (${info.error.message})`);
  }

  const data = await response.json();
  return data;
}

export async function getTrackInfoData(id: string): Promise<Track> {
  const data = await getSpotifyData(`/tracks/${id}`);
  return data;
}

export async function getSeveralTracksInfoData(ids: string): Promise<Track[]> {
  const data = await getSpotifyData(`/tracks?ids=${ids}`);
  return data.tracks;
}

export async function getSeveralTracksImageUrls(ids: string): Promise<string[]> {
  const data = await getSeveralTracksInfoData(ids);
  return data.map(item => item.album.images[1]?.url);
}

export async function getAlbumInfoData(id: string): Promise<Album> {
  const data = await getSpotifyData(`/albums/${id}`);
  return data;
}

// export async function getTrackFeaturesData(id: string): Promise<AudioFeatures> {
//   const data = await getSpotifyData(`/audio-features/${id}`);
//   return data;
// }

// export async function getSeveralTracksFeaturesData(ids: string): Promise<SeveralAudioFeatures> {
//   const data = await getSpotifyData(`/audio-features?ids=${ids}`);
//   return data;
// }

export async function getMylist(id: string) {
  const mylist = await prisma.mylist.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      user: true,
      createdAt: true,
      tracks: {
        select: {
          trackId: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
    },
  });
  
  return mylist;
}

// return 16 mylists (16 * 3 images < 50) 
export async function getBatchMylists(): Promise<MylistCardData[]> {
  const mylists = await prisma.mylist.findMany({
    select: {
      id: true,
      name: true,
      user: {
        select: {
          name: true,
          imageColor: true,
        },
      },
      createdAt: true,
      tracks: {
        select: {
          trackId: true,
        },
        orderBy: {
          position: 'asc',
        },
        take: 3,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 16,
  });

  return mylists;
}
