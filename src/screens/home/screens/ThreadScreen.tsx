import React from 'react';
import {View, Text} from 'react-native';
import {ThreadHead} from '@/components/thread/ThreadHead';
import {posts} from '@/demo/posts';
import {HomeScreenProps} from '@/screens/types';

export function ThreadScreen({
  navigation,
  route,
}: HomeScreenProps): JSX.Element {
  const commentId = route.params?.commentId;
  const comment = posts.find(p => p.id === commentId);

  return (
    <>
      <ThreadHead {...comment} />
    </>
  );
}
