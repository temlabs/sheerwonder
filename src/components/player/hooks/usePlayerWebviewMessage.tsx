import {startTransition} from 'react';
import {transferPlaybackToDevice} from '@/spotify/spotifyPlaybackFunctions';
import {useStore} from '@/store/useStore';
import useAccessTokenQuery from '@/tanstack/queries/useAccessTokenQuery';
import {playbackStateIsSufficientlyDifferent} from '../functions';

export function usePlayerWebViewMessage() {
  const setSpotifyDeviceId = useStore(state => state.setSpotifyDeviceId);
  const setPlayingTrack = useStore(state => state.setPlayingTrack);
  const {data: accessToken} = useAccessTokenQuery();

  const onDeviceIdMessage = async (message: string) => {
    const deviceId = message
      .substring('deviceIdReceived'.length)
      .replace(/\\/g, '');
    setSpotifyDeviceId(deviceId);
    try {
      await transferPlaybackToDevice(deviceId, accessToken);
    } catch (error) {
      console.log('transfer playback err: ', error, {deviceId, accessToken});
    }
  };

  const onPlaybackStateChangeMessage = async (message: string) => {
    try {
      const playbackState = JSON.parse(
        message.substring('playbackStateChanged'.length).replace(/\\/g, ''),
      );

      const newPlayingTrack = {
        position: playbackState.position,
        spotifyTrackId: playbackState.track_window.current_track.id,
        paused: playbackState.paused,
        startTime: Date.now(),
      };
      if (
        !!useStore.getState().selectedTrack &&
        playbackStateIsSufficientlyDifferent(
          useStore.getState().playingTrack,
          newPlayingTrack,
        )
      ) {
        console.log('state change: ', newPlayingTrack.paused);
        setPlayingTrack(newPlayingTrack);
      }
    } catch (error) {
      console.log('playback state message err: ', error);
    }
  };

  return {onDeviceIdMessage, onPlaybackStateChangeMessage};
}
