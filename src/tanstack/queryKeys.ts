export const SPOTIFY_ACCESS_TOKEN = 'spotifyAccessToken' as const;
export const SPOTIFY_PROFILE = 'spotifyProfile' as const;
export const RECENTLY_PLAYED_TRACKS = 'recentlyPlayedTracks' as const;

export const queryKeys = {
  SPOTIFY_PROFILE_KEY: () => [SPOTIFY_PROFILE],
  SPOTIFY_ACCESS_TOKEN_KEY: (
    authCode: string = '',
  ): [typeof SPOTIFY_ACCESS_TOKEN, string | null] => [
    SPOTIFY_ACCESS_TOKEN,
    authCode ?? null,
  ],
  RECENTLY_PLAYED_TRACKS: () => [RECENTLY_PLAYED_TRACKS],
} as const;
