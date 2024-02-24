import {UseQueryResult, useQuery} from '@tanstack/react-query';
import shortPostQueryKeys from './shortPostQueryKeys';
import {fetchShortPosts} from './shortPostFunctions';
import {ShortPostDraft} from './shortPostTypes';

export default function useGetShortPosts(
  queryKey?: string[],
): UseQueryResult<
  (Awaited<ReturnType<typeof fetchShortPosts>>[number] | ShortPostDraft)[],
  Error
> {
  const shortPostsQuery = useQuery({
    queryKey: queryKey ?? shortPostQueryKeys.all,
    queryFn: fetchShortPosts,
  });

  return shortPostsQuery;
}
