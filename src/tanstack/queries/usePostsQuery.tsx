import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {queryKeys} from '../queryKeys';
import {SPOTIFY_ACCESS_TOKEN_STALE_TIME} from '@/spotify/spotifyConfig';
import {ShortPostProps, StoryProps} from '@/demo/types';
import {posts} from '@/demo/posts';

export default function usePostQuery(): UseQueryResult<
  (ShortPostProps | StoryProps)[],
  Error
> {
  const postQuery = useQuery({
    queryKey: queryKeys.POSTS(),
    queryFn: () => posts,
    staleTime: SPOTIFY_ACCESS_TOKEN_STALE_TIME,
    refetchInterval: SPOTIFY_ACCESS_TOKEN_STALE_TIME,
    refetchIntervalInBackground: true,
  });

  return postQuery;
}
