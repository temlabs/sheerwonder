import {ThreadHeader} from '@/components/threadHeader/ThreadHeader';
import {ThreadList} from '@/components/threadList/ThreadList';
import {ShortPostProps} from '@/demo/types';
import {screens} from '@/navigators/config';
import {HomeParamList} from '@/navigators/types';
import {usePostThreadsQuery} from '@/tanstack/queries/usePostThreadsQuery';
import usePostsQuery from '@/tanstack/queries/usePostsQuery';
import {isShortPost} from '@/utils/feedUtils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {View} from 'react-native';

export function ShortPostScreen({
  route,
}: NativeStackScreenProps<HomeParamList, typeof screens.SHORT_POST>) {
  const postId = route.params.shortPostId;
  console.debug({postId});
  const {data: posts} = usePostsQuery();
  const shortPost = posts?.find(p => p.id === postId && isShortPost(p)) as
    | ShortPostProps
    | undefined;

  const parentThread = route.params.parentThread;

  // if there is a parent thread, the head should be a view with the post, then the thread below
  // if there is no parentThread, then the header should simply be the post

  const headerComponent = useMemo(
    () => (
      <>
        {shortPost ? (
          <ThreadHeader shortPost={shortPost} parentThread={parentThread} />
        ) : (
          <></>
        )}
      </>
    ),
    [parentThread, shortPost],
  );

  // if there is a parent thread, then the commend id in the usePostThreads should be the id of the last comment of the thread

  let commentId;
  if (parentThread) {
    commentId = parentThread[parentThread.length - 1].id;
  }

  const {data: postThreads} = usePostThreadsQuery({postId, commentId}); // this should return the threads in reply to a given comment or if no comment id is specified, a given post
  // const header =
  // const thread = {}

  return (
    <View>
      <ThreadList header={headerComponent} threads={postThreads} />
    </View>
  );
}
