import { Album, Track } from "@/lib/definitions";

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
