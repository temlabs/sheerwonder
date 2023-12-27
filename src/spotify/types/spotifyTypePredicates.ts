import {SpotifyTrack, SpotifyTrackItem} from './spotifyCommonTypes';

export const isSpotifyTrack = (track: Object): track is SpotifyTrack => {
  if ('name' in track && 'album' in track) {
    return true;
  } else {
    return false;
  }
};

export const isSpotifyTrackItem = (
  track: Object,
): track is SpotifyTrackItem => {
  if ('track' in track && 'context' in track && 'played_at' in track) {
    return true;
  } else {
    return false;
  }
};
