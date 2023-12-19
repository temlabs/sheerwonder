import {PlayingTrack} from '@/store/storeTypes';

export const playbackStateIsSufficientlyDifferent = (
  currentPlayingTrack: PlayingTrack,
  newPlayingTrack: PlayingTrack,
): boolean => {
  const startTimeIsDifferent =
    Math.abs(newPlayingTrack.startTime - currentPlayingTrack.startTime) > 2000;
  const positionIsDifferent =
    currentPlayingTrack.position !== newPlayingTrack.position;
  const playStateIsDifferent =
    currentPlayingTrack.paused !== newPlayingTrack.paused;
  const trackIdIsDifferent =
    currentPlayingTrack.spotifyTrackId !== newPlayingTrack.spotifyTrackId;

  return (
    startTimeIsDifferent ||
    positionIsDifferent ||
    playStateIsDifferent ||
    trackIdIsDifferent
  );
};
