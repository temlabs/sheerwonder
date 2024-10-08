import {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET} from '@env';

export const SPOTIFY_ACCESS_TOKEN_STALE_TIME = 3300 * 1000;
export const SPOTIFY_BASE_URL = 'https://accounts.spotify.com';
export const SPOTIFY_PLAYER_BASE_URL = 'https://api.spotify.com/v1/me/player';
export const CLIENT_ID = '2643e388efb64df690de5adc82c06369';
export const REDIRECT_URI = 'sheer-wonder://home';
export const CLIENT_SECRET = SPOTIFY_CLIENT_SECRET;
export const SCOPE =
  'user-read-private user-modify-playback-state user-read-playback-state streaming playlist-read-private user-read-recently-played';
