export const SPOTIFY_ACCESS_TOKEN = 'spotifyAccessToken' as const;
export const SPOTIFY_PROFILE = 'spotifyProfile' as const;

export const queryKeys = {
  SPOTIFY_PROFILE_KEY: () => [SPOTIFY_PROFILE],
  SPOTIFY_ACCESS_TOKEN_KEY: (
    authCode: string = '',
  ): [typeof SPOTIFY_ACCESS_TOKEN, string | null] => [
    SPOTIFY_ACCESS_TOKEN,
    authCode ?? null,
  ],
} as const;
