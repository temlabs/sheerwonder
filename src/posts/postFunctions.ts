import {posts} from '@/demo/posts';
import {ShortPostProps, StoryProps} from '@/demo/types';
import {queryClient} from '@/tanstack/config';
import {queryKeys} from '@/tanstack/queryKeys';

export const addPost = async (post: ShortPostProps | StoryProps) => {
  const currentPosts =
    queryClient.getQueryData<StoryProps[] | ShortPostProps[]>(
      queryKeys.POSTS(),
    ) ?? posts;
  queryClient.setQueryData(queryKeys.POSTS(), [post, ...currentPosts]);
  return [post, ...currentPosts];
};
