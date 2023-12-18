import {MMKV} from 'react-native-mmkv';

export const globalStoreValues = {
  SPOTIFY_AUTH_CODE: 'spotifyAuthCode',
  SPOTIFY_REFRESH_TOKEN: 'spotifyRefreshToken',
};

export const USER_DIRECTORY = 'users';

export const globalStorage = new MMKV();
