import {PlayOptions} from '@/spotify/spotifyTypes';

export interface GlobalStore {
  spotifyRefreshCode: string;
  spotifyAuthCode: string;
}

export type PlayFunction = (
  trackUri?: string,
  startFrom?: number,
) => Promise<void>;
export type PauseFunction = () => Promise<void>;

export interface SelectedTrack {
  postId: string;
  spotifyTrackId: string;
}

export interface PlayingTrack {
  spotifyTrackId: string;
  position: number;
  paused: boolean;
  startTime: number;
}
