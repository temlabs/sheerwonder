import {screens, stacks} from '@/navigators/config';

export type ScreenName = (typeof screens)[keyof typeof screens];
export type StackName = (typeof stacks)[keyof typeof stacks];

type RootStackParamList = {
  Tab: undefined;
  SpotifyLoginModal: undefined;
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
};
