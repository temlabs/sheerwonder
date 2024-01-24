import {comments} from '@/demo/comments';
import {posts} from '@/demo/posts';
import {ShortPostProps, StoryProps, Thread} from '@/demo/types';
import {queryClient} from '@/tanstack/config';
import {queryKeys} from '@/tanstack/queryKeys';
import {QueryFunctionContext} from '@tanstack/react-query';

export const addPost = async (post: ShortPostProps | StoryProps) => {
  const currentPosts =
    queryClient.getQueryData<StoryProps[] | ShortPostProps[]>(
      queryKeys.POSTS(),
    ) ?? posts;
  queryClient.setQueryData(queryKeys.POSTS(), [post, ...currentPosts]);
  return [post, ...currentPosts];
};

export const fetchPostThreads = async ({
  queryKey,
}: QueryFunctionContext<ReturnType<typeof queryKeys.POST_THREADS>>): Promise<
  Thread[]
> => {
  const [, postId, commentId] = queryKey;
  if (postId && commentId) {
    return comments.reduce((acc, c) => {
      if (c.postId === postId && c.parent?.id === commentId) {
        acc.push([c]);
      }
      return acc;
    }, [] as Thread[]);
    // note that this will only generate threads one level deep. tree searching logic will be required to fetch threads of length n because the parent has to be chained
  } else if (postId && !commentId) {
    return comments.reduce((acc, c) => {
      if (c.postId === postId) {
        acc.push([c]);
      }
      return acc;
    }, [] as Thread[]);
  } else {
    return [comments];
  }
};
