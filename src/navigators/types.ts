import {CommentProps, ShortPostProps} from '@/demo/types';
import {screens, stacks} from '@/navigators/config';
import {SpotifyTrack} from '@/spotify/types/spotifyCommonTypes';

export type ScreenName = (typeof screens)[keyof typeof screens];
export type StackName = (typeof stacks)[keyof typeof stacks];

export type RootStackParamList = {
  [screens.CREATE_SHORT_POST_SELECT_RANGE]: {track: SpotifyTrack};
  [screens.CREATE_SHORT_POST_SEARCH]: {};
  [screens.SPOTIFY_LOGOUT_MODAL]: {};
  [screens.SPOTIFY_LOGIN_MODAL]: {};
  [screens.CREATE_SHORT_POST_WRITE]: {};
  Tab: {};
};

type SpecificParamsBase = {
  [key in StackName]?: {[param: string]: string | boolean | number};
};

type SpecificParams = SpecificParamsBase & {};

export type BottomTabParamList = {
  [K in StackName]: K extends keyof SpecificParams
    ? SpecificParams[K]
    : undefined | {[key: string]: string | boolean | number};
};

export type HomeParamList = {
  Home: undefined;
  [screens.SHORT_POST]: {
    shortPost: ShortPostProps;
    parentThread?: CommentProps[];
  };
};
