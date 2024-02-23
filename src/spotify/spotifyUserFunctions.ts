import {QueryFunctionContext} from '@tanstack/react-query';
import {SPOTIFY_PLAYER_BASE_URL} from './spotifyConfig';
import {queryKeys} from '@/tanstack/queryKeys';
import {getError} from './spotifyUtils';
import {queryClient} from '@/tanstack/config';
import {useStore} from '@/store/useStore';
import {RecentlyPlayedResponse, SpotifyTrack} from './spotifyTrackTypes';
import {
  SpotifyRecentlyPlayedTracksResponse,
  SpotifySearchResponse,
} from './types/spotifyResponseTypes';

export const fetchRecentlyPlayedTracks = async ({
  queryKey,
}: QueryFunctionContext<
  ReturnType<typeof queryKeys.SPOTIFY_ACCESS_TOKEN_KEY>
>): Promise<SpotifyRecentlyPlayedTracksResponse> => {
  const [_key] = queryKey;
  const defaultResponse = {
    href: '',
    limit: 0,
    next: '',
    cursors: {},
    total: 0,
    items: [],
  };
  try {
    const authCode = useStore.getState().spotifyAuthCode;
    const accessToken = queryClient.getQueryData(
      queryKeys.SPOTIFY_ACCESS_TOKEN_KEY(authCode),
    );

    const response = await fetch(SPOTIFY_PLAYER_BASE_URL + '/recently-played', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const recentlyPlayed =
      (await response.json()) as SpotifyRecentlyPlayedTracksResponse;
    getError(recentlyPlayed);

    return recentlyPlayed ?? defaultResponse;
  } catch (error) {
    throw error;
  }
};

export const searchForTrack = async (
  searchTerm: string,
): Promise<SpotifySearchResponse | undefined> => {
  const authCode = useStore.getState().spotifyAuthCode;
  const accessToken = queryClient.getQueryData(
    queryKeys.SPOTIFY_ACCESS_TOKEN_KEY(authCode),
  );

  const encodedQuery = encodeURIComponent(searchTerm);
  const url = `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const responseJson = (await response.json()) as SpotifySearchResponse;

    return responseJson;
  } catch (error) {
    // throw error;
  }
};
