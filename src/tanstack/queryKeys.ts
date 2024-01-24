export const SPOTIFY_ACCESS_TOKEN = 'spotifyAccessToken' as const;
export const SPOTIFY_PROFILE = 'spotifyProfile' as const;
export const RECENTLY_PLAYED_TRACKS = 'recentlyPlayedTracks' as const;
export const POSTS = 'posts';
export const POST_THREADS = 'postThreads';

export const queryKeys = {
  SPOTIFY_PROFILE_KEY: () => [SPOTIFY_PROFILE],
  SPOTIFY_ACCESS_TOKEN_KEY: (
    authCode: string = '',
  ): [typeof SPOTIFY_ACCESS_TOKEN, string | null] => [
    SPOTIFY_ACCESS_TOKEN,
    authCode ?? null,
  ],
  RECENTLY_PLAYED_TRACKS: () => [RECENTLY_PLAYED_TRACKS],
  POSTS: () => [POSTS],
  POST_THREADS: (postId: string, commentId?: string) =>
    commentId ? [POST_THREADS, postId, commentId] : [POST_THREADS, postId],
} as const;
