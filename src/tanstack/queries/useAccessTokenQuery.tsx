import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {fetchAccessToken} from '@/spotify/spotifyAuthFunctions';
import {queryKeys} from '../queryKeys';
import {SPOTIFY_ACCESS_TOKEN_STALE_TIME} from '@/spotify/spotifyConfig';

export default function useAccessTokenQuery(
  authCode: string = null,
): UseQueryResult<string, Error> {
  const accessTokenQuery = useQuery({
    queryKey: queryKeys.SPOTIFY_ACCESS_TOKEN_KEY(authCode),
    queryFn: fetchAccessToken,
    staleTime: SPOTIFY_ACCESS_TOKEN_STALE_TIME,
    refetchInterval: SPOTIFY_ACCESS_TOKEN_STALE_TIME,
    refetchIntervalInBackground: true,
  });

  return accessTokenQuery;
}
