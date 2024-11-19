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
        cache: 'no-store'
    });
    const accessTokenData = await accessTokenResponse.json();
    
    // send a request for Spotify Web API
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
        headers: { 'Authorization': 'Bearer ' + accessTokenData.access_token, 'Accept-Language': 'ja' }
    });

    if (!response.ok) {
        const info = await response.json();
        throw new Error(`${info.error.status}: ${info.error.message}`);
    }

    // wait for testing
    // await new Promise(resolve => setTimeout(resolve, 3000));

    const data = await response.json();
    return data;
}

export async function getTrackInfoData(id: string) {
    if (!id) return null;
    const data = await getSpotifyData(`/tracks/${id}`);
    return data;
}

export async function getSeveralTracksInfoData(ids: string) {
    if (!ids) return null;
    const data = await getSpotifyData(`/tracks?ids=${ids}`);
    return data;
}

export async function getAlbumInfoData(id: string) {
    if (!id) return null;
    const data = await getSpotifyData(`/albums/${id}`);
    return data;
}

export async function getTrackFeaturesData(id: string) {
    if (!id) return null;
    const data = await getSpotifyData(`/audio-features/${id}`);
    return data;
}

export async function getSeveralTracksFeaturesData(ids: string) {
    if (!ids) return null;
    const data = await getSpotifyData(`/audio-features?ids=${ids}`);
    return data;
}
