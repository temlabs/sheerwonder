import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {queryKeys} from '../queryKeys';
import {fetchRecentlyPlayedTracks} from '@/spotify/spotifyUserFunctions';
import {SPOTIFY_ACCESS_TOKEN_STALE_TIME} from '@/spotify/spotifyConfig';
import {RecentlyPlayedResponse} from '@/spotify/spotifyTrackTypes';

export default function useRecentlyPlayedTracksQuery(): UseQueryResult<
  RecentlyPlayedResponse,
  Error
> {
  const recentlyPlayedTracksQuery = useQuery({
    queryKey: queryKeys.RECENTLY_PLAYED_TRACKS(),
    queryFn: fetchRecentlyPlayedTracks,
    staleTime: Infinity,
    refetchInterval: SPOTIFY_ACCESS_TOKEN_STALE_TIME,
    refetchIntervalInBackground: true,
  });

  return recentlyPlayedTracksQuery;
}
