import {UseQueryResult, useQuery} from '@tanstack/react-query';
import shortPostQueryKeys from './shortPostQueryKeys';
import {fetchShortPosts} from './shortPostFunctions';
import {ShortPostDraft} from './shortPostTypes';

export default function useGetShortPosts(): UseQueryResult<
  (Awaited<ReturnType<typeof fetchShortPosts>>[number] | ShortPostDraft)[],
  Error
> {
  const shortPostsQuery = useQuery({
    queryKey: shortPostQueryKeys.all,
    queryFn: fetchShortPosts,
  });

  return shortPostsQuery;
}
