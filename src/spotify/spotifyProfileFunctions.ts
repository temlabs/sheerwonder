import {QueryFunctionContext} from '@tanstack/react-query';
import {SpotifyProfile} from './spotifyTypes';
import {queryKeys} from '@/tanstack/queryKeys';

export const fetchSpotifyProfile = async ({
  queryKey,
}: QueryFunctionContext<
  ReturnType<typeof queryKeys.SPOTIFY_PROFILE_KEY>
>): Promise<SpotifyProfile> => {
  const [, accessToken] = queryKey;
  const res = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {Authorization: `Bearer ${accessToken}`},
  });
  const resJson = res.json() as unknown as SpotifyProfile;
  return resJson;
};

export const fetchAvailableDevices = async ({
  queryKey,
}: QueryFunctionContext<
  ReturnType<typeof queryKeys.SPOTIFY_PROFILE_KEY>
>): Promise<SpotifyProfile> => {
  const [, accessToken] = queryKey;
  const res = await fetch('https://api.spotify.com/v1/me/player/devices', {
    method: 'GET',
    headers: {Authorization: `Bearer ${accessToken}`},
  });
  const resJson = res.json() as unknown as SpotifyProfile;
  return resJson;
};
