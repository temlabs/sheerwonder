import {MMKV} from 'react-native-mmkv';
import {USER_DIRECTORY, globalStorage, globalStoreValues} from './config';

export const getInitialSpotifyAuthCode = (): string => {
  const localAuthCode = globalStorage.getString(
    globalStoreValues.SPOTIFY_AUTH_CODE,
  );
  return localAuthCode ?? '';
};

export const getInitialSpotifyRefreshToken = (): string => {
  const localRefreshToken = globalStorage.getString(
    globalStoreValues.SPOTIFY_REFRESH_TOKEN,
  );
  return localRefreshToken ?? '';
};

export const createUserStorage = (userId: string): void => {
  new MMKV({
    id: `user-${userId}-storage`,
    path: `${USER_DIRECTORY}/storage`,
    encryptionKey: 'hunter2',
  });
};
