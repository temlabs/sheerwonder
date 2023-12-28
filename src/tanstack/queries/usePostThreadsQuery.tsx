import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {queryKeys} from '../queryKeys';
import {fetchPostThreads} from '@/posts/postFunctions';
import {Thread} from '@/demo/types';

interface Props {
  postId: string;
  commentId?: string;
}

export function usePostThreadsQuery({
  postId,
  commentId,
}: Props): UseQueryResult<Thread[], Error> {
  const postThreadsQuery = useQuery({
    queryKey: queryKeys.POST_THREADS(postId, commentId),
    queryFn: fetchPostThreads,
  });

  return postThreadsQuery;
}
