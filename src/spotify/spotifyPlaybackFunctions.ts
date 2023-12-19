import {getError} from './spotifyUtils';
import {PlayOptions} from './spotifyTypes';
import {PlayingTrack, SelectedTrack} from '@/store/storeTypes';

export const transferPlaybackToDevice = async (
  deviceId: string,
  accessToken: string,
): Promise<void> => {
  console.log('transfering playback with device: ', deviceId);
  const body = {device_ids: [deviceId], play: false};
  const res = await fetch('https://api.spotify.com/v1/me/player', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
  if (res.status === 202) {
    return;
  }
  const resJson = await res.json();
  await getError(resJson);
};

export const playTrack = async (
  accessToken: string,
  deviceId: string,
  options?: PlayOptions,
): Promise<void> => {
  const body = {uris: options?.trackUris, position_ms: options?.startFrom ?? 0};
  console.log('playing track with access tok: ', accessToken);
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId.replace(
      /\\/g,
      '',
    )}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );
  console.log('play status: ', res.status);
  if (res.status === 202) {
    return;
  }

  const resJson = await res.json();
  console.debug(resJson);
  await getError(resJson);
};

export const pause = async (
  accessToken: string,
  deviceId: string,
): Promise<void> => {
  console.log('pausing');
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (res.status === 202) {
    return;
  }
  const resJson = await res.json();
  await getError(resJson);
};

export const isCurrentlyPlaying = (
  trackId: string,
  postId: string,
  selectedTrack: SelectedTrack,
  playingTrack: PlayingTrack,
): boolean => {
  return (
    selectedTrack.postId === postId &&
    playingTrack.spotifyTrackId === trackId &&
    !playingTrack.paused
  );
};
