import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {screens} from '@/navigators/config';
import { DrawerScreenProps } from '@react-navigation/drawer/lib/typescript/src/types';

type HomeParamListBase = {
  [screens.EDIT_FEED]: {[param: string]: undefined | string | boolean | number};
  [screens.THREAD]: {commentId?: string};
  [screens.STORY]: {storyId?: string};
  [screens.AUTH_SPOTIFY_RESULT]: {authCode?: string};
};

type HomeDrawerParamListBase = {
  [screens.HOME]: {[param: string]: undefined | string | boolean | number};
};

export type HomeScreenProps<T extends keyof HomeParamListBase> =
  NativeStackScreenProps<HomeParamListBase, T>;
export type HomeDrawerProps = DrawerScreenProps<HomeDrawerParamListBase>;
