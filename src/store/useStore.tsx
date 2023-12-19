import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {
  getInitialSpotifyAuthCode,
  getInitialSpotifyRefreshToken,
} from './storeFunctions';
import {queryClient} from '@/tanstack/config';
import {queryKeys} from '@/tanstack/queryKeys';
import {fetchAccessToken} from '@/spotify/spotifyAuthFunctions';
import {globalStorage, globalStoreValues} from './config';
import {
  PauseFunction,
  PlayFunction,
  PlayingTrack,
  SelectedTrack,
} from './storeTypes';
import {SPOTIFY_ACCESS_TOKEN_STALE_TIME} from '@/spotify/spotifyConfig';
import {pause, playTrack} from '@/spotify/spotifyPlaybackFunctions';
import {StoryProps} from '@/demo/types';

export interface StoreProps {
  spotifyAuthCode: string;
  setSpotifyAuthCode: (code: string) => void;
  spotifyRefreshToken: string;
  setSpotifyRefreshToken: (refreshToken: string) => void;
  spotifyAccessToken: string;
  spotifyAccessTokenExpiresIn: number;
  setSpotifyAccessCodeExpiresIn: (expiresIn: number) => void;
  resetSpotifyCodes: () => void;
  currentlyPlaying: string;
  play: PlayFunction;
  pause: PauseFunction;
  spotifyDeviceId: string;
  setSpotifyDeviceId: (deviceId: string) => void;
  selectedTrack: SelectedTrack;
  setSelectedTrack: (props: SelectedTrack) => void;
  playingTrack: PlayingTrack;
  setPlayingTrack: (props: PlayingTrack) => void;
}

export const useStore = create<StoreProps>()(
  devtools(set => ({
    spotifyAuthCode: getInitialSpotifyAuthCode(),
    spotifyAccessToken: '',
    spotifyAccessTokenExpiresIn: 0,
    setSpotifyAccessCodeExpiresIn: (expiresIn: number): void =>
      set(() => ({spotifyAccessTokenExpiresIn: expiresIn})),
    setSpotifyAuthCode: (authCode: string): void => {
      globalStorage.set(globalStoreValues.SPOTIFY_AUTH_CODE, authCode);
      queryClient
        .fetchQuery({
          queryKey: queryKeys.SPOTIFY_ACCESS_TOKEN_KEY(authCode),
          queryFn: fetchAccessToken,
        })
        .then(data => {
          queryClient.setQueryDefaults(queryKeys.SPOTIFY_ACCESS_TOKEN_KEY(), {
            staleTime: SPOTIFY_ACCESS_TOKEN_STALE_TIME,
          });
          queryClient.setQueryData(queryKeys.SPOTIFY_ACCESS_TOKEN_KEY(), data);
        });
      set(() => ({spotifyAuthCode: authCode}));
    },
    spotifyRefreshToken: getInitialSpotifyRefreshToken(),
    setSpotifyRefreshToken: (refreshToken: string): void => {
      globalStorage.set(globalStoreValues.SPOTIFY_REFRESH_TOKEN, refreshToken);
      set(() => ({spotifyRefreshToken: refreshToken}));
    },
    resetSpotifyCodes: (): void => {
      globalStorage.delete(globalStoreValues.SPOTIFY_AUTH_CODE);
      globalStorage.delete(globalStoreValues.SPOTIFY_REFRESH_TOKEN);
      queryClient.removeQueries(
        queryKeys.SPOTIFY_ACCESS_TOKEN_KEY(useStore.getState().spotifyAuthCode),
      );
      set(state => ({
        ...state,
        spotifyAuthCode: '',
        spotifyRefreshToken: '',
        spotifyAccessTokenExpiresIn: 0,
      }));
    },
    play: async (trackUri: string, startFrom: number): Promise<void> => {
      const accessToken = useStore.getState().spotifyAccessToken;
      const deviceId = useStore.getState().spotifyDeviceId;
      try {
        await playTrack(accessToken, deviceId, {
          startFrom,
          trackUris: [trackUri],
        });
      } catch (error) {
        throw error;
      }
    },
    pause: async (): Promise<void> => {
      const accessToken = useStore.getState().spotifyAccessToken;
      const deviceId = useStore.getState().spotifyDeviceId;
      pause(accessToken, deviceId);
      // .then(() =>
      //   useStore.setState(state => ({...state, selectedTrack: undefined})),
      // );
    },
    currentlyPlaying: '',
    spotifyDeviceId: '',
    setSpotifyDeviceId: (deviceId: string): void => {
      set(state => ({...state, spotifyDeviceId: deviceId}));
    },
    selectedTrack: {postId: '', spotifyTrackId: ''},
    setSelectedTrack: (props: SelectedTrack): void => {
      set(state => ({...state, selectedTrack: props}));
    },
    playingTrack: {position: 0, spotifyTrackId: '', paused: true, startTime: 0},
    setPlayingTrack: (props: PlayingTrack): void => {
      set(state => ({...state, playingTrack: props}));
    },
  })),
);
